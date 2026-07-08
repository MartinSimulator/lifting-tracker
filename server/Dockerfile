# We select a lightweight node image that runes in a linux environment
FROM node:22-alpine

# Set the working directory in the container to /app
# This is for the container, not our local machine
WORKDIR /app

# Copy dependenciey files into the container
COPY package*.json ./

# Install production dependencies inside the image (runs during build)
# npm ci = "clean install" from package-lock.json
# --omit=dev = omit dev dependencies
RUN npm ci --omit=dev

# Copy the rest of the server code into the container
COPY . .

# Document which port the app listens on (doesn't open the port, just tells Docker/GCP)
EXPOSE 8080

# Define the default command when te container starts (node index.js)
CMD ["node", "index.js"]