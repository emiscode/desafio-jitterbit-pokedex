# Stage 1: Build the Angular app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app and list the contents of the dist directory
RUN npm run build --prod && ls -la /app/dist && ls -la /app/dist/pokedex-app/browser

# Stage 2: Serve the Angular app with Nginx
FROM nginx:alpine

# Copy the built Angular app from the previous stage
COPY --from=build /app/dist/pokedex-app/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
