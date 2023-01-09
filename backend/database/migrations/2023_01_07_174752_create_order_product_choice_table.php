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
        Schema::create('order_product_choice', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('order_product_id')->nullable();
            $table->foreign('order_product_id')->references('id')->on('order_product');
            $table->unsignedBigInteger('product_choice_id')->nullable();
            $table->foreign('product_choice_id')->references('id')->on('product_choices');
            $table->unsignedBigInteger('product_id')->nullable();
            $table->foreign('product_id')->references('id')->on('products');
            $table->decimal('price')->nullable();

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
        Schema::table('order_product_choice', function (Blueprint $table) {
            $table->dropForeign(['order_product_id']);
            $table->dropForeign(['product_choice_id']);
            $table->dropForeign(['product_id']);
        });
        Schema::dropIfExists('order_product_choice');
    }
};
