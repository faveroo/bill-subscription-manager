FROM php:8.2-cli

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev zip curl \
    && docker-php-ext-install zip pdo pdo_mysql

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define pasta do projeto
WORKDIR /var/www

# Copia arquivos
COPY . .

# Instala dependências do Laravel
RUN composer install --no-dev --optimize-autoloader

# Ajusta permissões
RUN chmod -R 775 storage bootstrap/cache

# Expõe porta do Render
EXPOSE 10000

# Comando para iniciar
CMD php artisan serve --host=0.0.0.0 --port=10000