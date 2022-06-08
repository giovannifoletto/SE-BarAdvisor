# builder front
FROM node:16 as builder

WORKDIR /front

COPY /frontend/package.json .

COPY /frontend/package-lock.json .

RUN npm ci

COPY /frontend .

RUN npm run build

FROM node:16

WORKDIR /app

COPY /backend/package.json .

COPY /backend/package-lock.json .

RUN npm ci

COPY /backend .

COPY --from=builder /front/dist/ ./static

CMD [ "npm", "run", "start"]