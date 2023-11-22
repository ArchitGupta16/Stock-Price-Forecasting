# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Install mongo-express
RUN npm install -g mongo-express

# Expose the default MongoDB Express port
EXPOSE 8081

# Run mongo-express when the container launches
CMD ["mongo-express"]
