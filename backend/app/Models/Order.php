<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'billing_name',
        'billing_email',
        'billing_phone',
        'billing_address',
        'shipping_name',
        'shipping_email',
        'shipping_phone',
        'shipping_address',
        'payment_method',
        'payment_status',
        'payment_transaction',
        'agreed_on_terms_and_conditions',
        'shipping',
        'status',
        'discount',
        'sub_total',
        'total',
        'delivery_charge',
        'deactivated_at',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_product', 'order_id', 'product_id')->withPivot('price', 'discount', 'quantity');
    }
}
