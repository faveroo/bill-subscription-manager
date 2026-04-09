<?php

namespace App\Console\Commands;

use App\Models\Subscription;
use App\Notifications\SubscriptionExpiring;
use App\Service\CheckExpiringSubscriptionService;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CheckExpiringSubscriptions extends Command
{
    protected $signature = 'subscriptions:check-expiring';
    protected $description = 'Notifica usuários sobre assinaturas próximas do vencimento';

    public function handle()
    {
        $daysBefore = [7, 3, 1, 0]; // múltiplos lembretes
        $this->info('Verificando assinaturas próximas do vencimento...');

        CheckExpiringSubscriptionService::handle($daysBefore);

        $this->info('Notificações processadas!');
    }
}

