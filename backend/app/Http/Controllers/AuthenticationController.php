<?php

namespace App\Http\Controllers;

use App\Constants\UserTypes;
use App\Models\User;
use App\Traits\ImageTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Image;

class AuthenticationController extends Controller
{
    use ImageTrait;

    public function register(Request $request)
    {
        DB::beginTransaction();
        try {
            $validator = Validator::make($request->all(), [
                "name" => "required",
                "email" => "required|email",
                "password" => "required",
                "image" => 'image|mimes:jpg,jpeg,png,gif,svg|max:2048'
            ]);

            if ($validator->fails()) {
                $response = ['error' => $validator->errors()->first()];
                return response()->json($response, 400);
            }

            $input = $request->all();

            $image = $request->file('image');
            if ($image) {
                $input['image'] = $this->saveImage($image, 'users');
            } else {
                $input['image'] = null;
            }

            $input['password'] = bcrypt($input['password']);
            $input['type'] = UserTypes::ADMIN;

            $user = User::create($input);

            $response = [
                "result" => [
                    "user" => $user,
                    "token" => $user->createToken('eCommerce')->accessToken
                ]
            ];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }

    public function login(Request $request)
    {
        DB::beginTransaction();
        try {
            $validator = Validator::make($request->all(), [
                "email" => "required|email",
                "password" => "required"
            ]);

            if ($validator->fails()) {
                $response = ['error' => $validator->errors()->first()];
                return response()->json($response, 400);
            }

            $input = $request->all();

            if (Auth::attempt($input)) {
                $user = Auth::user();
                $user->image = $this->getImageUrl($user->image);
                $response = [
                    "result" => [
                        "user" => $user,
                        "token" => $user->createToken('eCommerce')->accessToken
                    ]
                ];
                DB::commit();
                return response()->json($response, 200);
            } else {
                $response = ["error" => "Incorrect Email or Password"];
                DB::rollBack();
                return response()->json($response, 401);
            }
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }

    public function logout()
    {
        DB::beginTransaction();
        try {
            $user = Auth::user();
            $user->token()->revoke();

            $response = ["result" => true];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }

    public function unauthenticated()
    {
        $response = ['error' => 'unauthenticated'];
        return response()->json($response, 403);
    }
}
