<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\User;
use App\Traits\ImageTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Image;

class ShopController extends Controller
{
    use ImageTrait;

    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $validator = Validator::make($request->all(), [
                "image" => 'image|mimes:jpg,jpeg,png,gif,svg|max:2048',
            ]);

            if ($validator->fails()) {
                $response = ["error" => $validator->errors()->first()];
                return response()->json($response, 400);
            }

            $input = $request->except(['image']);
            $image = $request->file('image');
            if ($image) {
                $input['image'] = $this->saveImage($image, 'shops');
            }

            Shop::where('id', $id)->update($input);

            $response = ["result" => "success"];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }

    public function showByVendorId($vendorId)
    {
        DB::beginTransaction();
        try {
            $vendor = User::find($vendorId);
            if (!$vendor) {
                $response = ["error" => "model not found"];
                return response()->json($response, 404);
            }
            $shop = $vendor->shop;
            if (!$shop) {
                $response = ["error" => "model not found"];
                return response()->json($response, 404);
            }

            $shop->image = $this->getImageUrl($shop->image);
            $response = ["result" => $shop];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }
}
