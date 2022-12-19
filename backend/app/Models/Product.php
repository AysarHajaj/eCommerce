<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "image",
        "arabic_name",
        "english_name",
        "arabic_description",
        "english_description",
        "price",
        "product_category_id",
        "product_sub_category_id",
        "user_id",
        "stock_quantity",
        "variation_price_from",
        "variation_price_to",
        "discount",
        "qr_code",
        "bar_code",
        "deactivated_at",
        "created_at",
        "updated_at",
        "deleted_at",
    ];

    public function vendor()
    {
        return $this->belongsTo(User::class, "user_id");
    }
}
