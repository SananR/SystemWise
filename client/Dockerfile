# Build the Angular App
# basically, this compiles the Angular project to static HTML and js files.
FROM node:20.15.0 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Serve these static files with NGINX.
FROM nginx:1.21.6-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/system-wise/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]