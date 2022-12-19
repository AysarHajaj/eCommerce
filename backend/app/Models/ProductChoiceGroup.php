<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductChoiceGroup extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "arabic_name",
        "english_name",
        "min_number",
        "max_number",
        "product_id",
        "deactivated_at",
        "created_at",
        "updated_at",
        "deleted_at",
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function productChoices()
    {
        return $this->hasMany(ProductChoice::class, 'product_choice_group_id');
    }
}
