<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CurrencyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        DB::beginTransaction();
        try {
            $currencies = Currency::all();

            $response = ["result" => $currencies];
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
            ]);

            if ($validator->fails()) {
                $response = ["error" => $validator->errors()->first()];
                return response()->json($response, 400);
            }

            $input = $request->only(['name']);


            $currency = Currency::create($input);

            $response = ["result" => $currency];
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
            $currency = Currency::find($id);
            if (!$currency) {
                $response = ["error" => "model not found"];
                return response()->json($response, 404);
            }

            $response = ["result" => $currency];
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
            ]);

            if ($validator->fails()) {
                $response = ["error" => $validator->errors()->first()];
                return response()->json($response, 400);
            }

            $input = $request->only(['name']);

            Currency::where('id', $id)->update($input);

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
            $currency = Currency::find($id);
            if ($currency) {
                $currency->delete();
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
            $currency = Currency::find($id);
            if ($currency) {
                if ($currency->deactivated_at) {
                    $currency->deactivated_at = null;
                } else {
                    $currency->deactivated_at = now();
                }
            } else {
                $response = ["error" => "model not found"];
                return response()->json($response, 404);
            }

            $currency->save();

            $response = ["result" => $currency->deactivated_at];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }
}
