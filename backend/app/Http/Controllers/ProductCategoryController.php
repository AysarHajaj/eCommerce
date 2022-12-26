<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use App\Traits\ImageTrait;
use App\Traits\QrCodeTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProductCategoryController extends Controller
{
    use ImageTrait, QrCodeTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        DB::beginTransaction();
        try {
            $categories = ProductCategory::all();
            $categories->map(function ($category) {
                $category->image = $this->getImageUrl($category->image);
                $category->qr_code = $this->getImageUrl($category->qr_code);

                return $category;
            });

            $response = ["result" => $categories];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }

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
                "name" => "required",
                "user_id" => "required",
                "image" => 'image|mimes:jpg,jpeg,png,gif,svg|max:2048'
            ]);

            if ($validator->fails()) {
                $response = ["error" => $validator->errors()->first()];
                return response()->json($response, 400);
            }

            $input = $request->only(['name', 'user_id']);
            $image = $request->file('image');

            $input['image'] = null;
            if ($image) {
                $input['image'] = $this->saveImage($image, 'productCategories');
            }
            $input['qr_code'] = $this->createQrCode();

            $category = ProductCategory::create($input);
            $category->image = $this->getImageUrl($category->image);
            $category->qr_code = $this->getImageUrl($category->qr_code);

            $response = ["result" => $category];
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
            $category = ProductCategory::find($id);
            if ($category) {
                $category->image = $this->getImageUrl($category->image);
                $category->qr_code = $this->getImageUrl($category->qr_code);
            } else {
                $response = ["error" => "model not found"];
                return response()->json($response, 404);
            }

            $response = ["result" => $category];
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
                "name" => "required",
                "image" => 'image|mimes:jpg,jpeg,png,gif,svg|max:2048'
            ]);

            if ($validator->fails()) {
                $response = ["error" => $validator->errors()->first()];
                return response()->json($response, 400);
            }

            $input = $request->only(['name']);
            $image = $request->file('image');
            if ($image) {
                $input['image'] = $this->saveImage($image, 'productCategories');
            }

            ProductCategory::where('id', $id)->update($input);

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
            $category = ProductCategory::find($id);
            if ($category) {
                $category->delete();
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
            $category = ProductCategory::find($id);
            if ($category) {
                if ($category->deactivated_at) {
                    $category->deactivated_at = null;
                } else {
                    $category->deactivated_at = now();
                }
            } else {
                $response = ["error" => "model not found"];
                return response()->json($response, 404);
            }

            $category->save();

            $response = ["result" => $category->deactivated_at];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }

    public function getCategoriesByShopVendorId($vendorId)
    {
        DB::beginTransaction();
        try {
            $categories = ProductCategory::whereNull("deactivated_at")
                ->where('user_id', $vendorId)
                ->get();

            $categories->map(function ($category) {
                $category->image = $this->getImageUrl($category->image);
                $category->qr_code = $this->getImageUrl($category->qr_code);

                return $category;
            });

            $response = ["result" => $categories];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }
}
