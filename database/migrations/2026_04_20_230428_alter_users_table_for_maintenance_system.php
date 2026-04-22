<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('users', 'name') || Schema::hasColumn('users', 'password')) {
            Schema::table('users', function (Blueprint $table): void {
                if (Schema::hasColumn('users', 'name') && ! Schema::hasColumn('users', 'full_name')) {
                    $table->renameColumn('name', 'full_name');
                }

                if (Schema::hasColumn('users', 'password') && ! Schema::hasColumn('users', 'password_hash')) {
                    $table->renameColumn('password', 'password_hash');
                }
            });
        }

        Schema::table('users', function (Blueprint $table): void {
            if (! Schema::hasColumn('users', 'phone')) {
                $table->string('phone', 30)->after('email')->default('');
            }

            if (! Schema::hasColumn('users', 'role')) {
                $table->string('role')->after('remember_token')->default('user');
            }

            if (! Schema::hasColumn('users', 'is_active')) {
                $table->boolean('is_active')->after('role')->default(true);
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            if (Schema::hasColumn('users', 'phone')) {
                $table->dropColumn('phone');
            }

            if (Schema::hasColumn('users', 'role')) {
                $table->dropColumn('role');
            }

            if (Schema::hasColumn('users', 'is_active')) {
                $table->dropColumn('is_active');
            }
        });

        if (Schema::hasColumn('users', 'full_name') || Schema::hasColumn('users', 'password_hash')) {
            Schema::table('users', function (Blueprint $table): void {
                if (Schema::hasColumn('users', 'full_name') && ! Schema::hasColumn('users', 'name')) {
                    $table->renameColumn('full_name', 'name');
                }

                if (Schema::hasColumn('users', 'password_hash') && ! Schema::hasColumn('users', 'password')) {
                    $table->renameColumn('password_hash', 'password');
                }
            });
        }
    }
};
