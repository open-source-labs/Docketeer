
FROM --platform=$BUILDPLATFORM node:18.12-alpine3.16
LABEL org.opencontainers.image.title="Docketeer" \
    org.opencontainers.image.description="Docketeer extension to show your container metrics" \
    org.opencontainers.image.vendor="Docketeer team" \
    com.docker.desktop.extension.api.version="0.3.0" \
    com.docker.extension.screenshots="" \
    com.docker.extension.detailed-description="" \
    com.docker.extension.publisher-url="" \
    com.docker.extension.additional-urls="" \
    com.docker.extension.changelog=""


COPY package*.json ./

# Copy the current directory contents into the container at /app
COPY . .

# Run npm install to install app dependencies
RUN npm install --yes

# Make port 4000 available to the world outside this container
# EXPOSE 4000

# Start the app
# CMD ["npm", "start"]
