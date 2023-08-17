# Builds everything from backend folder
FROM --platform=$BUILDPLATFORM node:18.12-alpine3.16 AS builder
WORKDIR /backend
COPY backend/package*.json .
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci
COPY backend/. .

# Builds everything in UI folder
FROM --platform=$BUILDPLATFORM node:18.12-alpine3.16 AS client-builder
WORKDIR /ui
# cache packages in layer
COPY ui/package.json /ui/package.json
COPY ui/package-lock.json /ui/package-lock.json
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci
# install
COPY ui /ui
RUN npm run build

# Creates the working directory for the extension
FROM --platform=$BUILDPLATFORM node:18.12-alpine3.16
LABEL org.opencontainers.image.title="Remake Docketeer" \
    org.opencontainers.image.description="Docker extension for monitoring and managing your containers" \
    org.opencontainers.image.vendor="Docketeer team" \
    com.docker.desktop.extension.api.version="0.3.0" \
    com.docker.extension.screenshots="" \
    com.docker.extension.detailed-description="" \
    com.docker.extension.publisher-url="" \
    com.docker.extension.additional-urls="" \
    com.docker.extension.changelog=""

# Copies necessary files into extension directory
COPY --from=builder /backend backend
COPY docker-compose.yaml .
COPY metadata.json .
COPY --from=client-builder /ui/build ui

COPY imageConfigs/prometheus prometheus
COPY imageConfigs/grafana grafana
COPY imageConfigs/node-exporter node-exporter
COPY imageConfigs/postgres postgres

# Starts the application
WORKDIR /backend
CMD ["npm", "start"]