# Bill / Subscription Manager

Aplicação para gerenciar assinaturas e despesas recorrentes, com lembretes de vencimento.

## Stack

- Laravel 13 (PHP 8.3+)
- Inertia.js + React
- Vite + TailwindCSS
- SQLite (padrão), filas/notifications/sessions em banco (`QUEUE_CONNECTION=database`, `SESSION_DRIVER=database`)

## Funcionalidades

- Autenticação (login/cadastro)
- CRUD de assinaturas (com categoria e ciclo de cobrança)
- Ativar/inativar assinatura
- Notificações de vencimento (canais: **mail** e **database**, via fila)

## Requisitos

- PHP 8.3+
- Composer
- Node.js + npm

## Instalação

1. Instale dependências:
   - `composer install`
   - `npm install`
2. Configure o ambiente:
   - `copy .env.example .env`
   - `php artisan key:generate`
3. Banco de dados (SQLite):
   - Rode migrations: `php artisan migrate`
   - Popule categorias padrão: `php artisan db:seed`

Atalho (faz setup + build):
- `composer run setup` (não roda seed)

## Rodando em desenvolvimento

- `composer run dev`

Esse comando sobe, em paralelo:
- `php artisan serve`
- `php artisan queue:listen --tries=1`
- `npm run dev`

## Lembretes de vencimento (Scheduler)

O agendamento está em `routes/console.php` e executa o comando `subscriptions:check-expiring` diariamente às **08:27**.

Para testar manualmente:
- `php artisan subscriptions:check-expiring`

Para rodar o scheduler localmente:
- `php artisan schedule:work`

Em produção, configure um cron para chamar o scheduler a cada minuto (exemplo):
- `* * * * * php /caminho/do/projeto/artisan schedule:run >> /dev/null 2>&1`

Como as notificações são enfileiradas, mantenha um worker de fila rodando (ex.: `php artisan queue:work`).

## Qualidade e testes

- PHP (Pint): `composer run lint` / `composer run lint:check`
- JS/TS: `npm run lint` / `npm run types:check`
- Testes: `composer test`

## Licença

MIT
