<?php

namespace App\Http\Controllers;

use App\Constants\UserTypes;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Image;

class AuthenticationController extends Controller
{
    public function register(Request $request)
    {
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
                $input['image'] = 'users/' . time() . '.' . $image->getClientOriginalExtension();
                $imgFile = Image::make($image->getRealPath());
                $imgFile->resize(150, 150, function ($constraint) {
                    $constraint->aspectRatio();
                })->save(storage_path('app/public/'  . $input['image']));
            } else {
                $input['image'] = null;
            }

            $input['password'] = bcrypt($input['password']);
            $input['type'] = UserTypes::ADMIN;

            $user = User::create($input);

            $response = [
                "data" => [
                    "user" => $user,
                    "token" => $user->createToken('eCommerce')->accessToken
                ]
            ];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            return response()->json($response, 500);
        }
    }

    public function login(Request $request)
    {
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
                if ($user->image) {
                    $user->image = env('APP_URL') . 'storage/' . $user->image;
                }
                $response = [
                    "data" => [
                        "user" => $user,
                        "token" => $user->createToken('eCommerce')->accessToken
                    ]
                ];

                return response()->json($response, 200);
            } else {
                $response = ["error" => "Incorrect Email or Password"];
                return response()->json($response, 401);
            }
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            return response()->json($response, 500);
        }
    }

    public function logout()
    {
        $user = Auth::user();
        $user->token()->revoke();

        return response()->json(["success" => "Logout"], 200);
    }

    public function unauthenticated()
    {
        $response = ['error' => 'unauthenticated'];
        return response()->json($response, 403);
    }
}
