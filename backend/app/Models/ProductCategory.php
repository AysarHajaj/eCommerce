<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductCategory extends Model
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

    public function productSubCategories()
    {
        return $this->hasMany(ProductSubCategory::class, "product_category_id");
    }

    public function products()
    {
        return $this->hasMany(Product::class, "product_category_id");
    }
}
