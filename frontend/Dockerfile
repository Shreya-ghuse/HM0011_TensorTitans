# Use node image for building
FROM node:20 AS builder

# Set working directory
WORKDIR /

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app and build
ARG RUST_BACKTRACE=full
ENV NODE_ENV=production
ENV VITE_FS_USE_POLLING=true
COPY . .
RUN npm run build

# Use nginx to serve static files
FROM nginx:latest
COPY --from=builder /dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
