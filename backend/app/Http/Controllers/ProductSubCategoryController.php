<?php

namespace App\Http\Controllers;

use App\Models\ProductSubCategory;
use App\Traits\ImageTrait;
use App\Traits\QrCodeTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProductSubCategoryController extends Controller
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
            $subCategories = ProductSubCategory::with('productCategory')->get();
            $subCategories->map(function ($subCategory) {
                $subCategory->qr_code = $this->getImageUrl($subCategory->qr_code);
                return $subCategory;
            });

            $response = ["data" => $subCategories];
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
                "product_category_id" => 'required'
            ]);

            if ($validator->fails()) {
                $response = ["error" => $validator->errors()->first()];
                return response()->json($response, 400);
            }

            $input = $request->all();
            $input['qr_code'] = $this->createQrCode();
            $subCategory = ProductSubCategory::create($input);
            $subCategory->qr_code = $this->getImageUrl($subCategory->qr_code);

            $response = ["data" => $subCategory];
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
            $subCategory = ProductSubCategory::with('productCategory')->find($id);
            if ($subCategory) {
                $subCategory->qr_code = $this->getImageUrl($subCategory->qr_code);
            } else {
                $response = ["error" => "model not found"];
                return response()->json($response, 404);
            }

            $response = ["data" => $subCategory];
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
                "product_category_id" => 'required'
            ]);

            if ($validator->fails()) {
                $response = ["error" => $validator->errors()->first()];

                return response()->json($response, 400);
            }

            $input = $request->all();
            ProductSubCategory::where('id', $id)->update($input);

            $response = ["data" => "success"];
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
            $subCategory = ProductSubCategory::find($id);
            if ($subCategory) {
                $subCategory->delete();
            } else {
                $response = ["error" => "model not found"];
                return response()->json($response, 404);
            }

            $response = ["data" => 'success'];
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
            $subCategory = ProductSubCategory::find($id);
            if ($subCategory) {
                if ($subCategory->deactivated_at) {
                    $subCategory->deactivated_at = null;
                } else {
                    $subCategory->deactivated_at = now();
                }
            } else {
                $response = ["error" => "model not found"];
                return response()->json($response, 404);
            }

            $subCategory->save();

            $response = ["data" => $subCategory->deactivated_at];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }
}