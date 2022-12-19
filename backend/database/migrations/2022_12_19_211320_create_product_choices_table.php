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
        Schema::create('product_choices', function (Blueprint $table) {
            $table->id();
            $table->string('arabic_name')->nullable();
            $table->string('english_name')->nullable();
            $table->decimal("price")->nullable();
            $table->unsignedBigInteger('product_choice_group_id')->nullable();
            $table->foreign('product_choice_group_id')->references('id')->on('product_choice_groups');
            $table->timestamp('deactivated_at')->nullable();
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
        Schema::table('product_choices', function (Blueprint $table) {
            $table->dropForeign(['product_choice_group_id']);
        });
        Schema::dropIfExists('product_choices');
    }
};
