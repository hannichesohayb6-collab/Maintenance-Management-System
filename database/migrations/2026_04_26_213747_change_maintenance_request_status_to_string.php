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
        Schema::table('maintenance_requests', function (Blueprint $table): void {
            // Use a plain string so the request flow can stay simple.
            $table->string('status')->default('pending')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('maintenance_requests', function (Blueprint $table): void {
            $table->enum('status', [
                'pending',
                'under_review',
                'offer_sent',
                'offer_accepted',
                'offer_rejected',
                'in_progress',
                'completed',
                'cancelled',
            ])->default('pending')->change();
        });
    }
};
