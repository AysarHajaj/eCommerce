<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Image;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $categories = Category::all();
            $categories->map(function ($category) {
                if ($category->image) {
                    return $category->image = env('APP_URL') . 'storage/' . $category->image;
                }
            });
            $response = ["data" => $categories];

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
                $input['image'] = 'thumbnail/' . time() . '.' . $image->getClientOriginalExtension();
                $imgFile = Image::make($image->getRealPath());
                $imgFile->resize(150, 150, function ($constraint) {
                    $constraint->aspectRatio();
                })->save(storage_path('app/public/'  . $input['image']));
            } else {
                $input['image'] = null;
            }

            $category = Category::create($input);
            $response = ["data" => $category];

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
            $category = Category::find($id);
            if ($category->image) {
                $category->image = env('APP_URL') . 'storage/' . $category->image;
            }

            $response = [
                "data" => $category
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
                $input['image'] = 'thumbnail/' . time() . '.' . $image->getClientOriginalExtension();
                $imgFile = Image::make($image->getRealPath());
                $imgFile->resize(150, 150, function ($constraint) {
                    $constraint->aspectRatio();
                })->save(storage_path('app/public/'  . $input['image']));
            }

            Category::where('id', $id)->update($input);
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
            $category = Category::find($id);
            $category->delete();
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
            $category = Category::find($id);
            if ($category->deactivated_at) {
                $category->deactivated_at = null;
            } else {
                $category->deactivated_at = now();
            }

            $category->save();
            $response = ["data" => $category->deactivated_at];
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            return response()->json($response, 500);
        }
    }
}
