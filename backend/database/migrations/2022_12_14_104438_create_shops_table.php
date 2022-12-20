<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->string("image")->nullable();
            $table->string("name")->nullable();
            $table->string("email")->nullable();
            $table->string("phone")->nullable();
            $table->string("address")->nullable();
            $table->string("map_location")->nullable();
            $table->string("number")->nullable();
            $table->text("description")->nullable();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('shop_category_id')->nullable();
            $table->foreign('shop_category_id')->references('id')->on('shop_categories');
            $table->unsignedBigInteger('city_id')->nullable();
            $table->foreign('city_id')->references('id')->on('cities');
            $table->unsignedBigInteger('district_id')->nullable();
            $table->foreign('district_id')->references('id')->on('districts');
            $table->unsignedBigInteger('currency_id')->nullable();
            $table->foreign('currency_id')->references('id')->on('currencies');
            $table->time("monday_opens_at")->nullable();
            $table->time("monday_closed_at")->nullable();
            $table->time("tuesday_opens_at")->nullable();
            $table->time("tuesday_closed_at")->nullable();
            $table->time("wednesday_opens_at")->nullable();
            $table->time("wednesday_closed_at")->nullable();
            $table->time("thursday_opens_at")->nullable();
            $table->time("thursday_closed_at")->nullable();
            $table->time("friday_opens_at")->nullable();
            $table->time("friday_closed_at")->nullable();
            $table->time("saturday_opens_at")->nullable();
            $table->time("saturday_closed_at")->nullable();
            $table->time("sunday_opens_at")->nullable();
            $table->time("sunday_closed_at")->nullable();
            $table->timestamp("deactivated_at")->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['shop_category_id']);
            $table->dropForeign(['city_id']);
            $table->dropForeign(['district_id']);
            $table->dropForeign(['currency_id']);
        });
        Schema::dropIfExists('shops');
    }
};
