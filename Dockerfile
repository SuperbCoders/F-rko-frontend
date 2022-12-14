FROM node:14.17.0 as build 


WORKDIR /react-app


COPY package*.json .


RUN yarn install


COPY . .


RUN yarn run build


FROM nginx:1.19


COPY ./nginx/nginx.conf /etc/nginx/nginx.conf


COPY --from=build /react-app/build /usr/share/nginx/html