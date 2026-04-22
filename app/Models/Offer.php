<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Offer extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'request_id',
        'technician_id',
        'offer_description',
        'estimated_cost',
        'estimated_days',
        'status',
        'sent_at',
        'responded_at',
    ];

    public function request(): BelongsTo
    {
        return $this->belongsTo(MaintenanceRequest::class, 'request_id');
    }

    public function technician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'technician_id');
    }
}
