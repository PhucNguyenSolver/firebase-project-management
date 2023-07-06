# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the application's dependencies
RUN npm install
RUN npm install -g nodemon

# docker run -p 3000:3000 --volume $(pwd):/app -it --rm  deltaplus sh -c "npm run start"