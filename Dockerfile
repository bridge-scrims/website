FROM node:lts-alpine

WORKDIR /app
ADD . .

RUN npm ci --no-audit
RUN npm run build
ENTRYPOINT npm run start