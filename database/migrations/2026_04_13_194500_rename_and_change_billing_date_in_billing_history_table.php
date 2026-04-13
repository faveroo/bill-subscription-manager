<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('billing_history', function (Blueprint $table) {
            $table->renameColumn('billing_date', 'event_date');
        });

        Schema::table('billing_history', function (Blueprint $table) {
            $table->dateTime('event_date')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('billing_history', function (Blueprint $table) {
            $table->date('event_date')->change();
        });

        Schema::table('billing_history', function (Blueprint $table) {
            $table->renameColumn('event_date', 'billing_date');
        });
    }
};
