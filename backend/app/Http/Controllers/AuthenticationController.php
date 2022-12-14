<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthenticationController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required",
            "email" => "required|email",
            "password" => "required"
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);

        $user = User::create($input);

        $response = [];
        $response['token'] = $user->createToken('eCommerce')->accessToken;

        return response()->json([$response], 200);
    }

    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                "email" => "required|email",
                "password" => "required"
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()->first()], 400);
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
