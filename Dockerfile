FROM php:8.5-cli

# 1. Dependências do sistema
RUN apt-get update && apt-get install -y \
    git unzip curl \
    libzip-dev libonig-dev libxml2-dev \
    libpng-dev libjpeg-dev libfreetype6-dev libicu-dev \
    libpq-dev

# 2. Node (versão 20)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# 3. Extensões PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg

RUN docker-php-ext-install \
    pdo pdo_pgsql pdo_mysql \
    mbstring zip exif pcntl bcmath gd intl

# 4. Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

# 6. Laravel deps
RUN COMPOSER_MEMORY_LIMIT=-1 composer install --no-dev --optimize-autoloader

# 7. Key
RUN php artisan key:generate || true
RUN php artisan migrate --force

# 8. Frontend
RUN npm install
RUN npm run build

# 9. Permissões
RUN chmod -R 775 storage bootstrap/cache

# 10. Cache
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

EXPOSE 10000

CMD php artisan serve --host=0.0.0.0 --port=10000
