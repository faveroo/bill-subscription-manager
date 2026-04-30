# Bill Subscription Manager

[![Laravel 13](https://img.shields.io/badge/Laravel-13.x-FF2D20?style=flat-square&logo=laravel&logoColor=white)](https://laravel.com/)
[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-2.x-9553E9?style=flat-square&logo=inertia&logoColor=white)](https://inertiajs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-6366f1?style=flat-square)](LICENSE)

O Bill Subscription Manager e uma aplicacao web full stack desenvolvida para gerenciar assinaturas e despesas recorrentes. O projeto foi criado para centralizar o controle de servicos ativos, organizar ciclos de cobranca, acompanhar historicos de pagamento e dar mais visibilidade aos custos recorrentes do usuario.

A aplicacao utiliza Laravel no backend e React com Inertia.js no frontend, oferecendo uma experiencia semelhante a uma SPA sem exigir uma camada de API separada.

## Visao Geral

A versao atual do sistema permite que usuarios autenticados gerenciem suas proprias assinaturas e acompanhem o ciclo de vida de cada servico por meio de uma visualizacao dedicada de historico. O dashboard destaca assinaturas ativas, proximas cobrancas, custos recorrentes e projecoes de gasto anual.

O projeto tambem inclui suporte a notificacoes de vencimento, filtros por categoria e ciclo de cobranca, alem de uma arquitetura de frontend estruturada com TypeScript e Tailwind CSS.

## Principais Funcionalidades

- Autenticacao de usuarios com fluxo de cadastro e login
- Dashboard com metricas principais e proximos eventos de cobranca
- Criacao, edicao, ativacao e inativacao de assinaturas
- Organizacao de assinaturas por categoria
- Suporte a ciclos de cobranca semanais, mensais, trimestrais e anuais
- Historico por assinatura com eventos de ativacao, cancelamento, reativacao e pagamento
- Pagina global de historico de cobrancas com paginacao
- Endpoints de notificacao para alertas recentes e nao lidos
- Interface responsiva desenvolvida com React, Inertia.js e Tailwind CSS

## Stack Tecnologica

### Backend

- PHP 8.3
- Laravel 13
- Eloquent ORM
- SQLite como padrao no ambiente local
- Laravel Notifications

### Frontend

- React 19
- Inertia.js 2
- TypeScript 5
- Tailwind CSS 4
- Vite 8

### Ferramentas

- Pest
- ESLint
- Prettier
- Laravel Pint

## Estrutura do Projeto

```text
app/            Services, controllers, models e regras de negocio
bootstrap/      Arquivos de inicializacao do framework
config/         Configuracoes da aplicacao e de pacotes
database/       Migrations e seeders
public/         Ponto de entrada publico e assets gerados
resources/js/   Aplicacao React, paginas, layouts e componentes compartilhados
resources/views/Templates Blade usados pelo Laravel/Inertia
routes/         Rotas web
tests/          Testes automatizados com Pest
```

## Requisitos

- PHP 8.3+
- Composer
- Node.js 20+
- npm

## Como Executar

1. Clone o repositorio.
2. Instale as dependencias PHP.
3. Instale as dependencias JavaScript.
4. Crie o arquivo de ambiente.
5. Gere a chave da aplicacao.
6. Execute as migrations.
7. Popule as categorias iniciais.
8. Inicie o ambiente de desenvolvimento.

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
composer run dev
```

Se preferir um bootstrap em um unico comando, o projeto tambem oferece:

```bash
composer run setup
```

Observacao: `composer run setup` instala dependencias, cria o `.env` quando necessario, gera a chave da aplicacao, executa as migrations, instala os pacotes npm e gera os assets do frontend. Se voce precisar popular as categorias apos esse processo, execute `php artisan db:seed`.

## Scripts Disponiveis

### Composer

- `composer run dev` inicia o servidor Laravel, o listener da fila e o servidor do Vite
- `composer run dev:ssr` inicia o fluxo com SSR e os servicos da aplicacao
- `composer run test` executa os testes Laravel apos a validacao de lint
- `composer run ci:check` executa lint, formatacao, checagem de tipos e testes

### npm

- `npm run dev` inicia o servidor de desenvolvimento do Vite
- `npm run build` gera os assets de producao
- `npm run build:ssr` gera os bundles do cliente e do SSR
- `npm run lint` executa o ESLint com correcao automatica
- `npm run lint:check` executa o ESLint sem modificar arquivos
- `npm run format` formata `resources/` com Prettier
- `npm run format:check` valida a formatacao
- `npm run types:check` executa a checagem de tipos do TypeScript

## Observacoes Sobre Banco de Dados

A configuracao local padrao em `.env.example` utiliza SQLite com sessoes, cache e filas baseadas em banco de dados. Na primeira execucao local, confirme se a configuracao do banco corresponde ao driver que voce deseja utilizar antes de rodar as migrations.

A aplicacao inclui categorias padrao via seeder e ciclos de cobranca inseridos via migration.

## Escopo Atual

Este repositorio ja contem o fluxo principal de gerenciamento de assinaturas. Algumas rotas, como relatorios, configuracoes e perfil, ja existem como secoes da aplicacao, mas ainda estao mais enxutas do que os modulos principais de assinaturas e dashboard.

## Roadmap

- Relatorios financeiros com analises mais completas
- Lembretes de cobranca por e-mail e dentro da aplicacao
- Expansao das areas de configuracoes e perfil
- Visualizacoes mais detalhadas sobre pagamentos e tendencias
- Maior cobertura de testes automatizados para fluxos de negocio

## Autor

Gabriel Favero Hoffmann  
GitHub: https://github.com/faveroo
