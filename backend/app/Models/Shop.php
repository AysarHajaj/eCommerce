<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shop extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "banner_image",
        "name",
        "email",
        "phone",
        "opens_at",
        "closed_at",
        "address",
        "greeting_message",
        "description",
        "seo_title",
        "seo_description",
        "user_id",
        'deactivated_at',
    ];

    public function vendor()
    {
        return $this->belongsTo(User::class, "user_id");
    }
}
