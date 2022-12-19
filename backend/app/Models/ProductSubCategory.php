<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductSubCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'product_category_id',
        'qr_code',
        'created_at',
        'updated_at',
        'deleted_at',
        'deactivated_at'
    ];

    public function productCategory()
    {
        return $this->belongsTo(ProductCategory::class, "product_category_id");
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'product_sub_category_id');
    }
}
