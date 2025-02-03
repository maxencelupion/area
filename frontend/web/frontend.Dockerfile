FROM node:22-bullseye AS base
WORKDIR /app
COPY ./*.json ./
RUN npm ci
EXPOSE 3000

FROM base AS dev
ENV NODE_ENV=development
COPY . .
CMD npm run dev

FROM base AS builder
WORKDIR /app
COPY . .
RUN npm run build

FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
CMD npm start