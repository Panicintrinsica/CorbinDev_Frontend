FROM node:20.13.1-alpine3.19 AS base
WORKDIR /app/src

FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM node:20.13.1-alpine3.19 AS release

WORKDIR /usr/app
COPY --from=build /app/src/dist/frontend/ ./
CMD ["node", "server/server.mjs"]
EXPOSE 4000
