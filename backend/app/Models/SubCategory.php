<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'category_id',
        'created_at',
        'updated_at',
        'deleted_at',
        'deactivated_at'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
