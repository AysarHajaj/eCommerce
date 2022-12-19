<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductChoice extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "arabic_name",
        "english_name",
        "price",
        "product_choice_group_id",
        "deactivated_at",
        "created_at",
        "updated_at",
        "deleted_at",
    ];

    public function productChoiceGroup()
    {
        return $this->belongsTo(ProductChoiceGroup::class, 'product_choice_group_id');
    }
}
