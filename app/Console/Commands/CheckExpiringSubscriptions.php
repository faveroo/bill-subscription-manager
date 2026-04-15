<?php

namespace App\Console\Commands;

use App\Services\CheckExpiringSubscriptionService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;

class CheckExpiringSubscriptions extends Command
{
    protected $signature = 'subscriptions:check-expiring';
    protected $description = 'Notifica usuários sobre assinaturas próximas do vencimento';

    public function handle()
    {
        $daysBefore = [7, 3, 1, 0]; // múltiplos lembretes
        $this->info('Verificando assinaturas próximas do vencimento...');

        CheckExpiringSubscriptionService::handle(Auth::user(), $daysBefore);

        $this->info('Notificações processadas!');
    }
}
