# Use an official Node.js runtime as a parent image
FROM --platform=$BUILDPLATFORM node:18.12-alpine3.16
# Set the working directory to /app
WORKDIR /app

# Installs curl
RUN apk --no-cache add curl

# Update the DOCKERVERSION to the most recent version, check dates on https://download.docker.com/linux/static/stable/x86_64/
# Installs docker to the image so it can run exec commands on the backend
ENV DOCKERVERSION=24.0.5
RUN curl -fsSLO https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKERVERSION}.tgz \
  && tar xzvf docker-${DOCKERVERSION}.tgz --strip 1 -C /usr/local/bin docker/docker \
  && rm docker-${DOCKERVERSION}.tgz


COPY package*.json ./

# Copy the current directory contents into the container at /app
COPY . .

# Run npm install to install app dependencies
RUN npm install --yes

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Start the app
# CMD ["npm", "start"]
