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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string("image")->nullable();
            $table->string("arabic_name")->nullable();
            $table->string("english_name")->nullable();
            $table->text("arabic_description")->nullable();
            $table->text("english_description")->nullable();
            $table->decimal("price")->nullable();
            $table->unsignedBigInteger('product_category_id')->nullable();
            $table->foreign('product_category_id')->references('id')->on('product_categories');
            $table->unsignedBigInteger('product_sub_category_id')->nullable();
            $table->foreign('product_sub_category_id')->references('id')->on('product_sub_categories');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->bigInteger("stock_quantity")->nullable();
            $table->decimal("variation_price_from")->nullable();
            $table->decimal("variation_price_to")->nullable();
            $table->integer('discount')->nullable();
            $table->string("qr_code")->nullable();
            $table->string("bar_code")->nullable();
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
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['product_category_id']);
            $table->dropForeign(['product_sub_category_id']);
            $table->dropForeign(['user_id']);
        });
        Schema::dropIfExists('products');
    }
};
