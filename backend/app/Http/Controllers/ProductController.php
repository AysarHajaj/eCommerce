<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductChoice;
use App\Models\ProductChoiceGroup;
use App\Traits\BarCodeTrait;
use App\Traits\ImageTrait;
use App\Traits\QrCodeTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Image;

class ProductController extends Controller
{
    use ImageTrait, QrCodeTrait, BarCodeTrait;

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $validator = Validator::make($request->all(), [
                "image" => 'image|mimes:jpg,jpeg,png,gif,svg|max:2048',
                // "english_name" => "required",
                // "user_id" => "required",
                // "product_category_id" => "required",
            ]);

            if ($validator->fails()) {
                $response = ["error" => $validator->errors()->first()];
                return response()->json($response, 400);
            }

            $input = $request->except(['image', 'product_choice_groups']);
            $image = $request->file('image');
            if ($image) {
                $input['image'] = $this->saveImage($image, 'products');
            } else {
                $input['image'] = null;
            }

            $input['qr_code'] = $this->createQrCode();
            $input['bar_code'] = $this->createBarCode();

            $product = Product::create($input);


            if (isset($request->product_choice_groups)) {
                foreach ($request->product_choice_groups as $group) {
                    $choiceGroup = ProductChoiceGroup::create([
                        'arabic_name' => isset($group['arabic_name']) ? $group['arabic_name'] : null,
                        'english_name' => isset($group['english_name']) ? $group['english_name'] : null,
                        'min_number' => isset($group['min_number']) ? $group['min_number'] : null,
                        'max_number' => isset($group['max_number']) ? $group['max_number'] : null,
                        'product_id' => $product->id,

                    ]);

                    if (isset($group['product_choices'])) {
                        foreach ($group['product_choices'] as $choice)
                            $productChoice = ProductChoice::create([
                                'arabic_name' => isset($choice['arabic_name']) ? $choice['arabic_name'] : null,
                                'english_name' => isset($choice['english_name']) ? $choice['english_name'] : null,
                                'price' => isset($choice['price']) ? $choice['price'] : null,
                                'product_choice_group_id' => $choiceGroup->id
                            ]);
                    }
                }
            }

            $response = ["result" => $product];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        DB::beginTransaction();
        try {
            $product = Product::with([
                'productChoiceGroups' => function ($q) {
                    $q->with(['productChoices']);
                }
            ])->find($id);

            if ($product) {
                $product->image = $this->getImageUrl($product->image);
                $product->qr_code = $this->getImageUrl($product->qr_code);
                $product->bar_code = $this->getImageUrl($product->bar_code);
            } else {
                $response = ["error" => "model not found"];
                return response()->json($response, 404);
            }

            $response = [
                "result" => $product
            ];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $validator = Validator::make($request->all(), [
                "image" => 'image|mimes:jpg,jpeg,png,gif,svg|max:2048',
                // "english_name" => "required",
                // "product_category_id" => "required",
            ]);

            if ($validator->fails()) {
                $response = ["error" => $validator->errors()->first()];
                return response()->json($response, 400);
            }

            $input = $request->except(['image', 'product_choice_groups']);
            $image = $request->file('image');
            if ($image) {
                $input['image'] = $this->saveImage($image, 'products');
            }

            product::where('id', $id)->update($input);

            $product = Product::with([
                'productChoiceGroups' => function ($q) {
                    $q->with(['productChoices']);
                }
            ])->find($id);

            $groups = $product->productChoiceGroups;
            if ($groups->count() > 0) {
                $ids = $groups->pluck('id');
                ProductChoice::whereIn('product_choice_group_id', $ids)->delete();
                ProductChoiceGroup::where('product_id', $product->id)->delete();
            }

            if (isset($request->product_choice_groups)) {
                foreach ($request->product_choice_groups as $group) {
                    $choiceGroup = ProductChoiceGroup::create([
                        'arabic_name' => isset($group['arabic_name']) ? $group['arabic_name'] : null,
                        'english_name' => isset($group['english_name']) ? $group['english_name'] : null,
                        'min_number' => isset($group['min_number']) ? $group['min_number'] : null,
                        'max_number' => isset($group['max_number']) ? $group['max_number'] : null,
                        'product_id' => $product->id,

                    ]);

                    if (isset($group['product_choices'])) {
                        foreach ($group['product_choices'] as $choice)
                            $productChoice = ProductChoice::create([
                                'arabic_name' => isset($choice['arabic_name']) ? $choice['arabic_name'] : null,
                                'english_name' => isset($choice['english_name']) ? $choice['english_name'] : null,
                                'price' => isset($choice['price']) ? $choice['price'] : null,
                                'product_choice_group_id' => $choiceGroup->id
                            ]);
                    }
                }
            }

            $response = ["result" => "success"];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $product = Product::find($id);
            if ($product) {
                $product->delete();
            } else {
                $response = ["error" => "model not found"];
                return response()->json($response, 404);
            }

            $response = ["result" => true];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }

    public function changeStatus(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $product = Product::find($id);
            if ($product) {
                if ($product->deactivated_at) {
                    $product->deactivated_at = null;
                } else {
                    $product->deactivated_at = now();
                }
            } else {
                $response = ["error" => "model not found"];
                return response()->json($response, 404);
            }

            $product->save();

            $response = ["result" => $product->deactivated_at];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }

    public function getProductsByVendorId($vendorId)
    {
        DB::beginTransaction();
        try {
            $products = Product::with([
                'productCategory',
                'productSubCategory',
                'productChoiceGroups' => function ($q) {
                    $q->with(['productChoices']);
                }
            ])->where('user_id', $vendorId)->get();

            $products->map(function ($product) {
                $product->image = $this->getImageUrl($product->image);
                $product->qr_code = $this->getImageUrl($product->qr_code);
                $product->bar_code = $this->getImageUrl($product->bar_code);

                return $product;
            });

            $response = ["result" => $products];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }

    public function getSingleProduct($id)
    {
        DB::beginTransaction();
        try {
            $product = Product::whereNull('deactivated_at')->with([
                'productChoiceGroups' => function ($q) {
                    $q->with(['productChoices']);
                },
                'productCategory',
                'productSubCategory'
            ])->find($id);

            if ($product) {
                $product->image = $this->getImageUrl($product->image);
                $product->qr_code = $this->getImageUrl($product->qr_code);
                $product->bar_code = $this->getImageUrl($product->bar_code);
            } else {
                $response = ["error" => "model not found"];
                return response()->json($response, 404);
            }

            $response = [
                "result" => $product
            ];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }

    public function getActiveProductsByVendorId($vendorId)
    {
        DB::beginTransaction();
        try {
            $products = Product::with([
                'productCategory',
                'productSubCategory',
                'productChoiceGroups' => function ($q) {
                    $q->with(['productChoices']);
                }
            ])->whereNull('deactivated_at')->where('user_id', $vendorId)->get();

            $products->map(function ($product) {
                $product->image = $this->getImageUrl($product->image);
                $product->qr_code = $this->getImageUrl($product->qr_code);
                $product->bar_code = $this->getImageUrl($product->bar_code);

                return $product;
            });

            $response = ["result" => $products];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }

    public function getActiveProductsByVendorIdAndCategoryId($vendorId, $categoryId)
    {
        DB::beginTransaction();
        try {
            $products = Product::with([
                'productCategory',
                'productSubCategory',
                'productChoiceGroups' => function ($q) {
                    $q->with(['productChoices']);
                }
            ])
                ->whereNull('deactivated_at')
                ->where('user_id', $vendorId)
                ->where('product_category_id', $categoryId)
                ->get();

            $products->map(function ($product) {
                $product->image = $this->getImageUrl($product->image);
                $product->qr_code = $this->getImageUrl($product->qr_code);
                $product->bar_code = $this->getImageUrl($product->bar_code);

                return $product;
            });

            $response = ["result" => $products];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }
}
