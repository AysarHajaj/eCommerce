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
        $categories = Category::all();
        $categories->map(function ($category) {
            return $category->image = env('APP_URL') . 'storage/' . $category->image;
        });

        return response()->json(["data" => $categories], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required",
            "image" => 'required|image|mimes:jpg,jpeg,png,gif,svg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $image = $request->file('image');
        $input = $request->all();
        $input['image'] = 'thumbnail/' . time() . '.' . $image->getClientOriginalExtension();

        $imgFile = Image::make($image->getRealPath());
        $imgFile->resize(150, 150, function ($constraint) {
            $constraint->aspectRatio();
        })->save(storage_path('app/public/'  . $input['image']));

        $category = Category::create($input);

        return response()->json(["data" => $category], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Category::find($id);
        $category->image = env('APP_URL') . 'storage/' . $category->image;

        return response()->json(["data" => $category], 200);
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
        $validator = Validator::make($request->all(), [
            "name" => "required",
            "image" => 'required|image|mimes:jpg,jpeg,png,gif,svg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $image = $request->file('image');
        $input = $request->all();
        $input['image'] = 'thumbnail/' . time() . '.' . $image->getClientOriginalExtension();

        $imgFile = Image::make($image->getRealPath());
        $imgFile->resize(150, 150, function ($constraint) {
            $constraint->aspectRatio();
        })->save(storage_path('app/public/'  . $input['image']));

        Category::where('id', $id)->update($input);

        return response()->json(["data" => "success"], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = Category::find($id);
        $category->delete();

        return response()->json(["data" => 'success'], 200);
    }
}
