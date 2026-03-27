<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Criar nova coluna SEM default
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->enum('billing_cycle_new', [
                'Semanal',
                'Mensal',
                'Trimestral',
                'Anual'
            ])->nullable();
        });

        // 2. Preencher dados
        DB::table('subscriptions')->update([
            'billing_cycle_new' => 'Mensal'
        ]);

        // 3. Remover antiga
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropColumn('billing_cycle');
        });

        // 4. Renomear
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->renameColumn('billing_cycle_new', 'billing_cycle');
        });

        // 5. Agora sim definir default corretamente
        DB::statement("
            ALTER TABLE subscriptions 
            MODIFY billing_cycle 
            ENUM('Semanal','Mensal','Trimestral','Anual') 
            NOT NULL DEFAULT 'Mensal'
        ");
    }

    public function down(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->date('billing_cycle')->nullable();
        });
    }
};