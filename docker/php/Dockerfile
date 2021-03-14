FROM php:7.4.1-fpm-alpine
COPY ./docker/php/php.ini /usr/local/etc/php/

COPY ./docker/php/install-composer.sh /
ARG TZ
RUN apk update && \
    apk add --update --no-cache --virtual=.build-dependencies \
    autoconf=~2.69 \
    gcc=~9.3 \
    g++=~9.3 \
    make=~4.2 \
    tzdata=2021a-r0 && \
    apk add --update --no-cache \
    icu-dev \
    libzip-dev \
    postgresql-dev \
    freetype-dev \
    bash \
    libjpeg-turbo-dev \
    libpng-dev && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo ${TZ} > /etc/timezone && \
    apk del .build-dependencies && \
    : 'Install Node.js' && \
    curl -sL https://deb.nodesource.com/setup_12.x && \
    apk add --update --no-cache nodejs && \
    : 'Install PHP Extensions' && \
    docker-php-ext-install -j$(nproc) pdo_pgsql opcache && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install -j$(nproc) gd && \
    : 'Install Composer' && \
    chmod 755 /install-composer.sh && \
    /install-composer.sh && \
    mv composer.phar /usr/local/bin/composer && \
    apk del --no-cache bash

COPY ./server /var/www

WORKDIR /var/www

RUN chmod -R 777 /var/www/laravel