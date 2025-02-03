FROM node:22-alpine3.19 AS base
WORKDIR /app
COPY package*.json ./
EXPOSE 8080

FROM base AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM base AS dev
ENV NODE_ENV development
RUN npm ci
COPY . .
CMD npm run start:dev

FROM base AS production
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
USER node
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD [ "node", "dist/main.js" ]