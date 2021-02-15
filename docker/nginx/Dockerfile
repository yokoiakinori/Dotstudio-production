FROM nginx:1.17-alpine

ADD ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /var/www/public

ADD ./server/laravel/public /var/www/public