FROM php:8.5-cli

RUN apt-get update && apt-get install -y \
    git unzip curl \
    libzip-dev libonig-dev libxml2-dev \
    libpng-dev libjpeg-dev libfreetype6-dev libicu-dev \
    libpq-dev \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo pdo_pgsql pdo_mysql \
        mbstring zip exif pcntl bcmath gd intl

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

RUN COMPOSER_MEMORY_LIMIT=-1 composer install --no-dev --optimize-autoloader

RUN npm install
RUN npm run build

RUN chmod -R 775 storage bootstrap/cache

RUN php artisan config:clear

EXPOSE 10000

