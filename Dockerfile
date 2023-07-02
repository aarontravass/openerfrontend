FROM node:18-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package*.json /app/
RUN npm i
COPY . /app/
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:alpine
COPY --from=build /app/dist/front/ /usr/share/nginx/html/
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
CMD nginx -g 'daemon off;'