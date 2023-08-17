# Use an official Node.js runtime as a parent image
FROM node:18.12-alpine3.16
# Set the working directory to /app
WORKDIR /app

# Set the PATH env variable
# ENV PATH="/usr/local/bin:${PATH}"
# COPY /usr/local/bin/docker /usr/local/bin/docker
# changed to most recent version!
# ENV DOCKERVERSION=20.10.23 

# RUN curl -fsSLO https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKERVERSION}.tgz \
#   && tar xzvf docker-${DOCKERVERSION}.tgz --strip 1 -C /usr/local/bin docker/docker \
#   && rm docker-${DOCKERVERSION}.tgz
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
