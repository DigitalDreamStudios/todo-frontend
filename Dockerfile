# Stage 1: Build the React app
FROM node:18 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the built React app with Nginx
FROM nginx:1.21

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built app from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port on which the app will run (optional, for documentation purposes)
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
