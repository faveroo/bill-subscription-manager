<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Create a portable replacement column first so we avoid raw SQL that
        // only works on MySQL.
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->enum('billing_cycle_new', [
                'Semanal',
                'Mensal',
                'Trimestral',
                'Anual'
            ])->default('Mensal');
        });

        DB::table('subscriptions')->update([
            'billing_cycle_new' => 'Mensal'
        ]);

        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropColumn('billing_cycle');
        });

        Schema::table('subscriptions', function (Blueprint $table) {
            $table->renameColumn('billing_cycle_new', 'billing_cycle');
        });
    }

    public function down(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->date('billing_cycle_old')->nullable();
        });

        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropColumn('billing_cycle');
        });

        Schema::table('subscriptions', function (Blueprint $table) {
            $table->renameColumn('billing_cycle_old', 'billing_cycle');
        });
    }
};
