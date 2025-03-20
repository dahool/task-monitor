FROM oven/bun:slim
#FROM node:22-slim

WORKDIR /app
RUN mkdir data

COPY . .

RUN bun install && bun run next build --experimental-build-mode compile
#RUN yarn install && yarn build

ENTRYPOINT ["bun","start"]