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
        try {
            $childCategories = ChildCategory::with(['category', 'subCategory'])->get();
            $response = ["data" => $childCategories];
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
                "category_id" => 'required',
                "sub_category_id" => 'required'
            ]);

            if ($validator->fails()) {
                $response = ['error' => $validator->errors()->first()];
                return response()->json($response, 400);
            }

            $input = $request->all();
            $childCategory = ChildCategory::create($input);
            $response = ["data" => $childCategory];
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
            $childCategory = ChildCategory::with(['category', 'subCategory'])->find($id);
            $response = ["data" => $childCategory];
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
                "category_id" => 'required',
                "sub_category_id" => 'required'
            ]);

            if ($validator->fails()) {
                $response = ['error' => $validator->errors()->first()];
                return response()->json($response, 400);
            }

            $input = $request->all();
            ChildCategory::where('id', $id)->update($input);
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
            $subCategory = ChildCategory::find($id);
            $subCategory->delete();
            $response = ["data" => 'success'];
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            return response()->json($response, 500);
        }
    }

    public function changeStatus(Request $request, $id)
    {
        try {
            $childCategory = ChildCategory::find($id);
            if ($childCategory->deactivated_at) {
                $childCategory->deactivated_at = null;
            } else {
                $childCategory->deactivated_at = now();
            }

            $childCategory->save();
            $response = ["data" => $childCategory->deactivated_at];
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            return response()->json($response, 500);
        }
    }
}
