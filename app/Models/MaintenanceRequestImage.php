<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceRequestImage extends Model
{
    protected $fillable = ['maintenance_request_id', 'image_path'];

    public function maintenanceRequest()
    {
        return $this->belongsTo(MaintenanceRequest::class);
    }
}
