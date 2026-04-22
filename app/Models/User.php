<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'full_name',
        'email',
        'password_hash',
        'phone',
        'role',
        'is_active',
    ];

    /**
     * @var list<string>
     */
    protected $hidden = [
        'password_hash',
        'remember_token',
        'two_factor_secret',
        'two_factor_recovery_codes',
    ];

    /**
     * @var list<string>
     */
    protected $appends = [
        'name',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password_hash' => 'hashed',
            'is_active' => 'boolean',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function getAuthPassword(): string
    {
        return $this->password_hash;
    }

    protected function name(): Attribute
    {
        return Attribute::get(fn (): string => $this->full_name);
    }

    public function maintenanceRequestsCreated(): HasMany
    {
        return $this->hasMany(MaintenanceRequest::class, 'user_id');
    }

    public function maintenanceRequestsAssigned(): HasMany
    {
        return $this->hasMany(MaintenanceRequest::class, 'assigned_technician_id');
    }

    public function offers(): HasMany
    {
        return $this->hasMany(Offer::class, 'technician_id');
    }

    public function statusChanges(): HasMany
    {
        return $this->hasMany(RequestStatusHistory::class, 'changed_by');
    }
}
