<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class MaintenanceRequest extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'assigned_technician_id',
        'title',
        'description',
        'location',
        'priority',
        'status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function assignedTechnician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_technician_id');
    }

    public function offers(): HasMany
    {
        return $this->hasMany(Offer::class, 'request_id');
    }

    public function latestOffer()
    {
        // نستخدم hasOne مع الترتيب حسب الأحدث
        return $this->hasOne(Offer::class, 'request_id')->latestOfMany();
    }

    // إذا استمر الخطأ مع latestOfMany، استخدم هذه الصيغة البديلة والأكيدة:
    /*
    public function latestOffer()
    {
        return $this->hasOne(Offer::class, 'request_id')->orderBy('id', 'desc');
    }
    */

    public function statusHistory(): HasMany
    {
        return $this->hasMany(RequestStatusHistory::class, 'request_id');
    }
}
