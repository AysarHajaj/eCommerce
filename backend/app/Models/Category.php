<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'image',
        'created_at',
        'updated_at',
        'deleted_at',
        'deactivated_at'
    ];

    public function subCategories()
    {
        return $this->hasMany(SubCategory::class);
    }

    public function childCategories()
    {
        return $this->hasMany(ChildCategory::class);
    }
}
