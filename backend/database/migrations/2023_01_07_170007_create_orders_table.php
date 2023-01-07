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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('billing_name')->nullable();
            $table->string('billing_email')->nullable();
            $table->string('billing_phone')->nullable();
            $table->text('billing_address')->nullable();

            $table->string('shipping_name')->nullable();
            $table->string('shipping_email')->nullable();
            $table->string('shipping_phone')->nullable();
            $table->text('shipping_address')->nullable();

            $table->string('payment_method')->nullable();
            $table->string('payment_status')->nullable();
            $table->string('payment_transaction')->nullable();

            $table->boolean('agreed_on_terms_and_conditions')->default(true);
            $table->string('shipping')->nullable();
            $table->string('status')->nullable();
            $table->decimal('discount')->nullable();
            $table->decimal('sub_total')->nullable();
            $table->decimal('total')->nullable();
            $table->decimal('delivery_charge')->nullable();

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
        Schema::dropIfExists('orders');
    }
};
