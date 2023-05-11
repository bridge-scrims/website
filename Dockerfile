FROM node:19

WORKDIR /app
ADD . .

RUN npm ci --no-audit
RUN npm run build
ENTRYPOINT npm run start