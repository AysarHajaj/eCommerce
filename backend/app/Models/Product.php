<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "thumbnail_image",
        "banner_image",
        "short_name",
        "name",
        "slug",
        "category_id",
        "sub_category_id",
        "child_category_id",
        "user_id",
        "price",
        "offer_price",
        "stock_quantity",
        "short_description",
        "long_description",
        "deactivated_at",
        "seo_title",
        "seo_description",
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, "category_id");
    }

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class, "sub_category_id");
    }

    public function childCategory()
    {
        return $this->belongsTo(ChildCategory::class, "child_category_id");
    }

    public function vendor()
    {
        return $this->belongsTo(User::class, "user_id");
    }
}
