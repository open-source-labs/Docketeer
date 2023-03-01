# use an official Node.js runtime as a parent image
FROM node

# set the working directory to /app
WORKDIR /app

COPY package*.json ./

# run npm install to install app dependencies
RUN npm install

# copy the current directory contents into the container at /app
COPY . .

# get access to docker
ENV DOCKERVERSION=19.03.12
RUN curl -fsSLO https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKERVERSION}.tgz \
  && tar xzvf docker-${DOCKERVERSION}.tgz --strip 1 -C /usr/local/bin docker/docker \
  && rm docker-${DOCKERVERSION}.tgz

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Start the app
CMD ["npm", "start"]
