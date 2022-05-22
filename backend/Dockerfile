FROM node:17

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci

EXPOSE 3000

COPY . .
CMD [ "npm", "run", "start"]
