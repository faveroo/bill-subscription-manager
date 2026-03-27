<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->foreignId('billing_cycle_id')
                  ->nullable()
                  ->constrained('billing_cycles')
                  ->nullOnDelete();
        });

        DB::table('subscriptions')->get()->each(function ($sub) {
        $cycle = DB::table('billing_cycles')
            ->where('name', $sub->billing_cycle)
            ->first();

        DB::table('subscriptions')
            ->where('id', $sub->id)
            ->update([
                'billing_cycle_id' => $cycle->id ?? null
            ]);
        });

        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropColumn('billing_cycle');
        });
    }

    public function down(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropForeign(['billing_cycle_id']);
            $table->dropColumn('billing_cycle_id');
        });
    }
};
