FROM oven/bun:1.1.42-alpine AS base
WORKDIR /app/src

FROM base AS install
COPY package*.json ./
RUN bun install --frozen-lockfile
COPY . ./

FROM install AS build
RUN bun run build
WORKDIR /usr/app
COPY --from=base /app/src/dist/frontend ./

FROM install AS execute

EXPOSE 4000
ENTRYPOINT [ "bun", "server/server.mjs" ]
