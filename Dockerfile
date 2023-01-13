FROM node:19

WORKDIR /app
ADD . .

RUN npm ci --omit=dev --no-audit
RUN npm run build
ENTRYPOINT npm run start