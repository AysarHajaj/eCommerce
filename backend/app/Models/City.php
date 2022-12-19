<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class City extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'created_at',
        'updated_at',
        'deleted_at',
        'deactivated_at'
    ];

    public function shops()
    {
        return $this->hasMany(Shop::class, "city_id");
    }

    public function districts()
    {
        return $this->hasMany(District::class, "city_id");
    }
}
