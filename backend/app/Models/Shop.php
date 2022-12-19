<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shop extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "image",
        "name",
        "email",
        "phone",
        "address",
        "map_location",
        "number",
        "description",
        "user_id",
        "shop_category_id",
        "city_id",
        "district_id",
        "currency_id",
        "monday_opens_at",
        "monday_closed_at",
        "tuesday_opens_at",
        "tuesday_closed_at",
        "wednesday_opens_at",
        "wednesday_closed_at",
        "thursday_opens_at",
        "thursday_closed_at",
        "friday_opens_at",
        "friday_closed_at",
        "saturday_opens_at",
        "saturday_closed_at",
        "sunday_opens_at",
        "sunday_closed_at",
        'deactivated_at',
        'created_at',
        'update_at',
        'deleted_at',
    ];

    public function vendor()
    {
        return $this->belongsTo(User::class, "user_id");
    }
}
