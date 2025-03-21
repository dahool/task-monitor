FROM oven/bun:latest AS builder

WORKDIR /app

COPY . .

RUN bun install && bun run next build --experimental-build-mode compile

FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

CMD ["server.js"]