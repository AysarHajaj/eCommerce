<?php

namespace App\Http\Controllers;

use App\Models\ChildCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChildCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $childCategories = ChildCategory::with(['category', 'subCategory'])->get();

        return response()->json(["data" => $childCategories], 200);
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
            "category_id" => 'required',
            "sub_category_id" => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $input = $request->all();
        $childCategory = ChildCategory::create($input);

        return response()->json(["data" => $childCategory], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $childCategory = ChildCategory::with(['category', 'subCategory'])->find($id);

        return response()->json(["data" => $childCategory], 200);
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
            "category_id" => 'required',
            "sub_category_id" => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $input = $request->all();
        ChildCategory::where('id', $id)->update($input);

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
        $subCategory = ChildCategory::find($id);
        $subCategory->delete();

        return response()->json(["data" => 'success'], 200);
    }

    public function changeStatus(Request $request, $id)
    {
        $childCategory = ChildCategory::find($id);
        if ($childCategory->deactivated_at) {
            $childCategory->deactivated_at = null;
        } else {
            $childCategory->deactivated_at = now();
        }

        $childCategory->save();

        return response()->json(["data" => $childCategory->deactivated_at], 200);
    }
}
