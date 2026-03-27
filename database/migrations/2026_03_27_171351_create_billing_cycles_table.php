<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('billing_cycles', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Ex: Mensal
            $table->integer('interval_days'); // Ex: 30
            $table->timestamps();
        });

        // Inserir valores padrão
        DB::table('billing_cycles')->insert([
            ['name' => 'Semanal', 'interval_days' => 7],
            ['name' => 'Mensal', 'interval_days' => 30],
            ['name' => 'Trimestral', 'interval_days' => 90],
            ['name' => 'Anual', 'interval_days' => 365],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('billing_cycles');
    }
};
