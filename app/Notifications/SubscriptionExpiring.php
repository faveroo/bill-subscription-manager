<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SubscriptionExpiring extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public int $subscriptionId,
        public string $subscriptionName,
        public string $nextBillingDate,
        public int $daysBefore,
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $daysText = match ($this->daysBefore) {
            0 => 'hoje',
            1 => 'amanhã',
            default => "em {$this->daysBefore} dias",
        };
        return (new MailMessage)
            ->subject('Sua assinatura está para vencer')
            ->line("A assinatura \"{$this->subscriptionName}\" vence {$daysText} (em {$this->nextBillingDate}).")
            ->action('Ver detalhes', url("/subscriptions/{$this->subscriptionId}"))
            ->line('Renove para continuar utilizando o serviço.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $daysText = match ($this->daysBefore) {
            0 => 'hoje',
            1 => 'amanhã',
            default => "em {$this->daysBefore} dias",
        };

        return [
            'message' => "A assinatura \"{$this->subscriptionName}\" vence {$daysText}.",
            'subscription_id' => $this->subscriptionId,
            'subscription_name' => $this->subscriptionName,
            'next_billing_date' => $this->nextBillingDate,
            'days_before' => $this->daysBefore,
            'action_url' => "/subscriptions/{$this->subscriptionId}",
        ];
    }
}

