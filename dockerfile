# Use an official Node.js runtime as a parent image
FROM node
# Set the working directory to /app
WORKDIR /app

# Set the PATH env variable
# ENV PATH="/usr/local/bin:${PATH}"
# COPY /usr/local/bin/docker /usr/local/bin/docker
# changed to most recent version!
ENV DOCKERVERSION=20.10.23 

RUN curl -fsSLO https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKERVERSION}.tgz \
  && tar xzvf docker-${DOCKERVERSION}.tgz --strip 1 -C /usr/local/bin docker/docker \
  && rm docker-${DOCKERVERSION}.tgz \
  && curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 \
  && chmod 700 get_helm.sh \
  && ./get_helm.sh \
  && curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl --silent https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl \
  && chmod +x kubectl \
  && mv kubectl /usr/local/bin/

COPY package*.json ./

# Run npm install to install app dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Start the app
# CMD ["npm", "start"]
