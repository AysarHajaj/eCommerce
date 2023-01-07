<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\OrderProductChoice;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $orderInput = $request->only([
                'billing_name',
                'billing_email',
                'billing_phone',
                'billing_address',
                'shipping_name',
                'shipping_email',
                'shipping_phone',
                'shipping_address',
                'payment_method',
                // 'payment_status',
                // 'payment_transaction',
                'agreed_on_terms_and_conditions',
                // 'shipping',
                // 'status',
                // 'discount',
                // 'sub_total',
                // 'total',
                // 'delivery_charge',
                // 'deactivated_at',
                // 'created_at',
                // 'updated_at',
                // 'deleted_at',
                'customer_id',
                'vendor_id',
            ]);

            $order = Order::create($orderInput);
            if ($request->has('products')) {
                foreach ($request->products as $currentProduct) {
                    $product = Product::with([
                        'productChoiceGroups' => function ($q) {
                            $q->with(['productChoices']);
                        }
                    ])->find($currentProduct['id']);
                    $productInput = [
                        'product_id' => $product->id,
                        'order_id' => $order->id,
                        'price' => $product->price,
                        'discount' => $product->discount,
                        'quantity' => $currentProduct['quantity']
                    ];

                    $orderProduct = OrderProduct::create($productInput);
                    if (isset($currentProduct['choices'])) {
                        foreach ($currentProduct['choices'] as $currentChoice) {
                            $choice = $product->productChoiceGroups->pluck('productChoices')->flatten()->keyBy('id');
                            $choice = $choice[$currentChoice['id']];
                            $choiceInput = [
                                'order_product_id' => $orderProduct->id,
                                'product_choice_id' => $currentChoice['id'],
                                'price' => $choice['price'],
                                'product_id' => $product->id
                            ];

                            $orderProductChoice = OrderProductChoice::create($choiceInput);
                        }
                    }
                }
            }

            $response = ["result" => $order];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }
}
