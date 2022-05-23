FROM node:16 as builder

WORKDIR /front

COPY package.json .

COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run generate

FROM nginx:1.19-alpine

COPY --from=builder /front/dist/ /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]