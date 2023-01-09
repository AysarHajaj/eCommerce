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

    public function productCategory()
    {
        return $this->belongsTo(ProductCategory::class, "product_category_id");
    }

    public function productSubCategory()
    {
        return $this->belongsTo(ProductSubCategory::class, "product_sub_category_id");
    }

    public function productChoiceGroups()
    {
        return $this->hasMany(ProductChoiceGroup::class, 'product_id');
    }

    public function orderProductChoices()
    {
        return $this->belongsToMany(ProductChoice::class, 'product_choices', 'product_id', 'product_choice_id')->withPivot('price');
    }
}
