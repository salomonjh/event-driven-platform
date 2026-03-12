const redisClient = require('./config/redis');
const sequelize = require('./config/database');
const { createNotification } = require('./services/notification.service');
const { getEventById } = require('./services/event.service');

/**
 * Retries a function with exponential backoff in case of failure. If all retries fail, it throws the error to be handled by the caller.
 */
async function withRetry(fn, reitries = 3, delay = 1000) {
    let attempt = 0;
    while (attempt < reitries) {
        try {
            return await fn();
        } catch (error) {
            attempt++;
            console.warn(`[WARN] Attempt ${attempt} failed:`, error);
            const isLastAttempt = attempt === reitries;
            if (isLastAttempt) {
                console.error('[ERROR] Max retries reached. Marking notification as FAILED.');
                throw error;
            }
            // Exponential backoff delay
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)));
        }
    }
}

async function startWorker() {
    // conect redis client
    await redisClient.connect();

    // Create subscriber client to listen for events
    const subscriber = redisClient.duplicate();
    await subscriber.connect();

    console.log('[INFO] Worker waiting for events on channel: events.created');

    await subscriber.subscribe('events.created', async (message) => {
        let notificationInstance = null;
        try {
            const eventData = JSON.parse(message);
            console.log('[RECEIVED] Event:', eventData);

            // create a notification based on the event
            const [notification, created] = await createNotification({
                eventId: eventData.id,
                status: 'PENDING',
                payload: eventData.payload
            });

            // Store the notification instance for potential status updates
            notificationInstance = notification;

            if (!created) {
                console.log(`[SKIPPED] Event ${eventData.id} already has a notification. Skipping processing.`);
                return;
            }

            await withRetry(async () => {
                // Simulate error for testing retry mechanism
                if (Math.random() < 0.7) {
                    throw new Error('Simulated processing error');
                }

                // Simulate processing time
                console.log(`[PROCESSING] Notification for event ${eventData.id}...`);
                await new Promise(resolve => setTimeout(resolve, 10000));
            }, 3, 1000);

            // Update notification status
            await notificationInstance.update({ status: 'SENT' });
            console.log(`[COMPLETED] Notification ${notification.id} processed for event ${eventData.id} completed.`);

            const event = await getEventById(eventData.id);
            if (event) {
                await event.update({ status: 'PROCESSED' });
                console.log(`[UPDATED] Event ${eventData.id} status updated to PROCESSED.`);
            }
        } catch (error) {
            console.error('[ERROR] Error processing event:', error);
            if (notificationInstance) {
                try {
                    await notificationInstance.update({ status: 'FAILED' });
                } catch (updateError) {
                    console.error('[ERROR] Error updating notification status to FAILED:', updateError);
                }
            }
        };
    });
}

startWorker().catch(error => console.error('[ERROR] Error starting worker:', error));