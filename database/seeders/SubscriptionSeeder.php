<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubscriptionSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::query()->first();

        $categoryIds = DB::table('categories')
            ->whereIn('name', ['Streaming', 'Música', 'Cloud/Software', 'Produtividade', 'Finanças', 'Outros'])
            ->pluck('id', 'name');

        $now = now();
        $baseBillingDate = Carbon::parse($now)->startOfMonth()->toDateString();
        $baseNextBillingDate = Carbon::parse($now)->startOfMonth()->addMonth()->toDateString();

        $subscriptions = [
            [
                'name' => 'Netflix',
                'price' => 39.90,
                'billing_cycle' => $baseBillingDate,
                'next_billing_date' => $baseNextBillingDate,
                'description' => 'Plano mensal',
                'category_id' => $categoryIds['Streaming'] ?? null,
            ],
            [
                'name' => 'Spotify',
                'price' => 21.90,
                'billing_cycle' => $baseBillingDate,
                'next_billing_date' => $baseNextBillingDate,
                'description' => 'Assinatura mensal',
                'category_id' => $categoryIds['Música'] ?? null,
            ],
            [
                'name' => 'Google One',
                'price' => 7.99,
                'billing_cycle' => $baseBillingDate,
                'next_billing_date' => $baseNextBillingDate,
                'description' => 'Armazenamento em nuvem',
                'category_id' => $categoryIds['Cloud/Software'] ?? null,
            ],
            [
                'name' => 'Notion',
                'price' => 0.00,
                'billing_cycle' => $baseBillingDate,
                'next_billing_date' => null,
                'description' => 'Plano gratuito',
                'category_id' => $categoryIds['Produtividade'] ?? null,
            ],
            [
                'name' => 'Banco/Conta Premium',
                'price' => 12.90,
                'billing_cycle' => $baseBillingDate,
                'next_billing_date' => $baseNextBillingDate,
                'description' => 'Pacote de serviços',
                'category_id' => $categoryIds['Finanças'] ?? null,
            ],
        ];

        foreach ($subscriptions as $subscription) {
            DB::table('subscriptions')->updateOrInsert(
                ['user_id' => $user->id, 'name' => $subscription['name']],
                [
                    'price' => $subscription['price'],
                    'billing_cycle' => $subscription['billing_cycle'],
                    'next_billing_date' => $subscription['next_billing_date'],
                    'description' => $subscription['description'],
                    'category_id' => $subscription['category_id'],
                    'created_at' => $now,
                    'updated_at' => $now,
                ]
            );
        }
    }
}

