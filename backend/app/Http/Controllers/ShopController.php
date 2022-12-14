<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Image;

class ShopController extends Controller
{
    public function show($id)
    {
        try {
            $shop = Shop::find($id);
            if ($shop->banner_image) {
                $shop->banner_image = env('APP_URL') . 'storage/' . $shop->banner_image;
            }
            $response = ["data" => $shop];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            return response()->json($response, 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                "name" => "required",
                "email" => "required|unique:users,email," . $id,
                "banner_image" => 'image|mimes:jpg,jpeg,png,gif,svg|max:2048',
                "phone" => "required",
                "opens_at" => "required",
                "closed_at" => "required",
                "address" => "required",
                "greeting_message" => "required",
                "description" => "required",
                "seo_title" => "required",
                "seo_description" => "required",
            ]);

            if ($validator->fails()) {
                $response = ["error" => $validator->errors()->first()];
                return response()->json($response, 400);
            }

            $input = $request->except(['banner_image']);
            $image = $request->file('banner_image');
            if ($image) {
                $input['banner_image'] = 'banners/' . time() . '.' . $image->getClientOriginalExtension();
                $imgFile = Image::make($image->getRealPath());
                $imgFile->resize(150, 150, function ($constraint) {
                    $constraint->aspectRatio();
                })->save(storage_path('app/public/'  . $input['banner_image']));
            }

            Shop::where('id', $id)->update($input);

            $response = ["data" => "success"];
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            return response()->json($response, 500);
        }
    }

    public function showByVendorId($vendorId)
    {
        try {
            $vendor = User::find($vendorId);
            $shop = $vendor->shop;
            if ($shop->banner_image) {
                $shop->banner_image = env('APP_URL') . 'storage/' . $shop->banner_image;
            }
            $response = ["data" => $shop];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            return response()->json($response, 500);
        }
    }
}
