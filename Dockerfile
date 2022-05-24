# builder front
FROM node:16 as builder

WORKDIR /front

COPY /frontend/package.json .

COPY /frontend/package-lock.json .

RUN npm ci

COPY /frontend .

RUN npm run generate

FROM node:17

WORKDIR /app
COPY /backend/package.json .
COPY /backend/package-lock.json .
RUN npm ci

COPY --from=builder /front/dist/ /static

EXPOSE 4000

COPY /backend .
CMD [ "npm", "run", "start"]