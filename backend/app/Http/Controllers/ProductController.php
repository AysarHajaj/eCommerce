<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Image;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $products = Product::all();
            $products->map(function ($product) {
                if ($product->thumbnail_image) {
                    $product->thumbnail_image = env('APP_URL') . 'storage/' . $product->thumbnail_image;
                }
                if ($product->banner_image) {
                    $product->banner_image = env('APP_URL') . 'storage/' . $product->banner_image;
                }

                return $product;
            });
            $response = ["data" => $products];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
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
        try {
            $validator = Validator::make($request->all(), [
                "thumbnail_image" => 'image|mimes:jpg,jpeg,png,gif,svg|max:2048',
                "banner_image" => 'image|mimes:jpg,jpeg,png,gif,svg|max:2048',
                "short_name" => "required",
                "name" => "required",
                "slug" => "required",
                "category_id" => "required",
                "sub_category_id",
                "child_category_id",
                "price" => "required",
                "offer_price",
                "stock_quantity" => "required",
                "short_description" => "required",
                "long_description" => "required",
            ]);

            if ($validator->fails()) {
                $response = ["error" => $validator->errors()->first()];
                return response()->json($response, 400);
            }

            $input = $request->except(['thumbnail_image', 'banner_image']);
            $thumbnailImage = $request->file('thumbnail_image');

            if ($thumbnailImage) {
                $input['thumbnail_image'] = 'products/thumbnails/' . time() . '.' . $thumbnailImage->getClientOriginalExtension();
                $imgFile = Image::make($thumbnailImage->getRealPath());
                $imgFile->resize(150, 150, function ($constraint) {
                    $constraint->aspectRatio();
                })->save(storage_path('app/public/'  . $input['thumbnail_image']));
            } else {
                $input['thumbnail_image'] = null;
            }

            $bannerImage = $request->file('banner_image');

            if ($bannerImage) {
                $input['banner_image'] = 'products/banners/' . time() . '.' . $bannerImage->getClientOriginalExtension();
                $imgFile = Image::make($bannerImage->getRealPath());
                $imgFile->resize(150, 150, function ($constraint) {
                    $constraint->aspectRatio();
                })->save(storage_path('app/public/'  . $input['banner_image']));
            } else {
                $input['banner_image'] = null;
            }

            $product = Product::create($input);
            $response = ["data" => $product];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
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
        try {
            $product = Product::find($id);
            if ($product->thumbnail_image) {
                $product->thumbnail_image = env('APP_URL') . 'storage/' . $product->thumbnail_image;
            }
            if ($product->banner_image) {
                $product->banner_image = env('APP_URL') . 'storage/' . $product->banner_image;
            }

            $response = [
                "data" => $product
            ];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
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
        try {
            $validator = Validator::make($request->all(), [
                "thumbnail_image" => 'image|mimes:jpg,jpeg,png,gif,svg|max:2048',
                "banner_image" => 'image|mimes:jpg,jpeg,png,gif,svg|max:2048',
                "short_name" => "required",
                "name" => "required",
                "slug" => "required",
                "category_id" => "required",
                "sub_category_id",
                "child_category_id",
                "user_id",
                "price" => "required",
                "offer_price",
                "stock_quantity" => "required",
                "short_description" => "required",
                "long_description" => "required",
            ]);

            if ($validator->fails()) {
                $response = ["error" => $validator->errors()->first()];
                return response()->json($response, 400);
            }

            $input = $request->except(['thumbnail_image', 'banner_image']);
            $thumbnailImage = $request->file('thumbnail_image');

            if ($thumbnailImage) {
                $input['thumbnail_image'] = 'products/' . time() . '.' . $thumbnailImage->getClientOriginalExtension();
                $imgFile = Image::make($thumbnailImage->getRealPath());
                $imgFile->resize(150, 150, function ($constraint) {
                    $constraint->aspectRatio();
                })->save(storage_path('app/public/'  . $input['thumbnail_image']));
            }

            $bannerImage = $request->file('banner_image');

            if ($bannerImage) {
                $input['banner_image'] = 'products/' . time() . '.' . $bannerImage->getClientOriginalExtension();
                $imgFile = Image::make($bannerImage->getRealPath());
                $imgFile->resize(150, 150, function ($constraint) {
                    $constraint->aspectRatio();
                })->save(storage_path('app/public/'  . $input['banner_image']));
            }

            product::where('id', $id)->update($input);
            $response = ["data" => "success"];
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
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
        try {
            $product = Product::find($id);
            $product->delete();
            $response = ["data" => "success"];
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            return response()->json($response, 500);
        }
    }

    public function changeStatus(Request $request, $id)
    {
        try {
            $product = Product::find($id);
            if ($product->deactivated_at) {
                $product->deactivated_at = null;
            } else {
                $product->deactivated_at = now();
            }

            $product->save();
            $response = ["data" => $product->deactivated_at];
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            return response()->json($response, 500);
        }
    }
}
