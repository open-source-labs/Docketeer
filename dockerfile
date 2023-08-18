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
LABEL org.opencontainers.image.title="Docketeer" \
    org.opencontainers.image.description="Docker extension for monitoring and managing your containers, images, and networks" \
    org.opencontainers.image.vendor="Docketeer team" \
    com.docker.desktop.extension.api.version="0.3.0" \
    com.docker.extension.screenshots="" \
    com.docker.desktop.extension.icon="https://github.com/oslabs-beta/docketeer-extension/blob/dev/ui/assets/docketeer-logo-light.png?raw=true" \
    com.docker.extension.detailed-description="" \
    com.docker.extension.publisher-url="" \
    com.docker.extension.additional-urls="" \
    com.docker.extension.changelog=""

# Installs curl
RUN apk --no-cache add curl

# Update the DOCKERVERSION to the most recent version, check dates on https://download.docker.com/linux/static/stable/x86_64/
# Installs docker to the image so it can run exec commands on the backend
ENV DOCKERVERSION=24.0.5
RUN curl -fsSLO https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKERVERSION}.tgz \
  && tar xzvf docker-${DOCKERVERSION}.tgz --strip 1 -C /usr/local/bin docker/docker \
  && rm docker-${DOCKERVERSION}.tgz

# Copies necessary files into extension directory
COPY --from=builder /backend backend
COPY docker-compose.yaml .
COPY metadata.json .
COPY docketeer.svg .
COPY --from=client-builder /ui/build ui

# Creates and copies files to folders that docker-compose will use create named volumes from
COPY imageConfigs/prometheus prometheus
COPY imageConfigs/grafana grafana
COPY imageConfigs/postgres postgres

# Starts the application
WORKDIR /backend
CMD ["npm", "start"]