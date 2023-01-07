<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderProductChoice extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'order_product_id',
        'product_choice_id',
        'price',
        'created_at',
        'updated_at',
        'deleted_at',
    ];
}
