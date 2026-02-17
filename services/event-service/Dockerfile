FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src ./src
COPY openapi ./openapi

EXPOSE 3000

CMD ["npm", "run", "dev"]
