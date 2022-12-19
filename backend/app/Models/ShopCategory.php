<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShopCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'image',
        'qr_code',
        'created_at',
        'updated_at',
        'deleted_at',
        'deactivated_at'
    ];

    public function shops()
    {
        return $this->hasMany(Shop::class, 'shop_category_id');
    }
}
