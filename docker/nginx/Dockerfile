FROM nginx:1.17-alpine

COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /var/www/laravel/public

COPY ./server/laravel/public /var/www/laravel/public