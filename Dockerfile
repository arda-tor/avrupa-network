# syntax=docker/dockerfile:1

# ---- deps: bagimliliklari kur ----
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: Next uygulamasini derle ----
FROM node:22-alpine AS builder
WORKDIR /app
# NEXT_PUBLIC_* degiskenleri BUILD zamaninda gomulur. API URL'i Dokploy'da
# build-arg olarak ver: --build-arg NEXT_PUBLIC_API_URL=https://turkhub-backend.torarda.com/api
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- runner: standalone ciktiyi calistir ----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# root olmayan kullanici
RUN addgroup -g 1001 -S nodejs \
  && adduser -S nextjs -u 1001

# standalone sunucu + statik varliklar (public klasoru projede yok)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
