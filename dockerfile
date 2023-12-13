FROM nginx:1.23.1-alpine as base
EXPOSE 80

# build nuxt into static files
FROM node:21-alpine3.17 as build
WORKDIR /build
COPY . .
RUN npm install && npm run generate

# copy static files into nginx
FROM base as release
WORKDIR /usr/share/nginx/html
COPY --from=build /build/.output/public .