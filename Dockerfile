# Use an official Node.js runtime as a parent image
FROM node:18.12.1-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Run npm install to install app dependencies
RUN npm install

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Start the app
CMD ["npm", "start"]