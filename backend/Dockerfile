FROM node:lts-alpine3.23

RUN apk upgrade --no-cache

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

EXPOSE $PORT

CMD ["/bin/sh", "-c", "if [ \"$ENV\" = \"PROD\" ]; then npm run start; else npm run dev; fi"]