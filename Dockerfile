FROM node:lts-alpine AS build-stage
WORKDIR /app
# 1. Copy package files and install dependencies first (for caching)
COPY package*.json ./
RUN npm i --legacy-peer-deps
# 2. Copy the REST of the project files, .dockerignore prevents unnecessary files from being copied
COPY . .
RUN npm run build:prod

FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
