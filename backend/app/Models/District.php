<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class District extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'city_id',
        'created_at',
        'updated_at',
        'deleted_at',
        'deactivated_at'
    ];
}
