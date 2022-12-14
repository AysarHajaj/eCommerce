<?php

namespace App\Http\Controllers;

use App\Constants\UserTypes;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Image;

class UserController extends Controller
{
    public function storeVendor(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                "name" => "required",
                "email" => "required|unique:users,email",
                "password" => "required",
                "image" => 'image|mimes:jpg,jpeg,png,gif,svg|max:2048'
            ]);

            if ($validator->fails()) {
                $response = ["error" => $validator->errors()->first()];
                return response()->json($response, 400);
            }
            $input = $request->only(['name', 'email']);
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

            $input['password'] = bcrypt($request->password);
            $input['type'] = UserTypes::VENDOR;

            $user = User::create($input);
            $shop = Shop::create([
                'user_id' => $user->id
            ]);

            $response = ["data" => "success"];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            return response()->json($response, 500);
        }
    }

    public function getVendors()
    {
        try {
            $vendors = User::where('type', UserTypes::VENDOR)
                ->select(
                    'id',
                    'name',
                    'email',
                    'image',
                    'deactivated_at'
                )->get();
            $vendors->map(function ($vendor) {
                if ($vendor->image) {
                    return $vendor->image = env('APP_URL') . 'storage/' . $vendor->image;
                }
            });
            $response = ["data" => $vendors];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            return response()->json($response, 500);
        }
    }

    public function getVendor($id)
    {
        try {
            $vendor = User::select('id', 'name', 'image', 'deactivated_at', 'email')->find($id);
            if ($vendor->image) {
                $vendor->image = env('APP_URL') . 'storage/' . $vendor->image;
            }
            $response = ["data" => $vendor];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            return response()->json($response, 500);
        }
    }

    public function deleteVendor($id)
    {
        try {
            $category = User::find($id);
            $category->delete();
            $response = ["data" => "success"];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            return response()->json($response, 500);
        }
    }

    public function updateVendor(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                "name" => "required",
                "email" => "required|unique:users,email," . $id,
                "image" => 'image|mimes:jpg,jpeg,png,gif,svg|max:2048'
            ]);

            if ($validator->fails()) {
                $response = ["error" => $validator->errors()->first()];
                return response()->json($response, 400);
            }

            $input = $request->only(['name', 'email']);
            $image = $request->file('image');
            if ($image) {
                $input['image'] = 'users/' . time() . '.' . $image->getClientOriginalExtension();
                $imgFile = Image::make($image->getRealPath());
                $imgFile->resize(150, 150, function ($constraint) {
                    $constraint->aspectRatio();
                })->save(storage_path('app/public/'  . $input['image']));
            }
            if ($request->filled("password")) {
                $input['password'] = bcrypt($request->password);
            }

            User::where('id', $id)->update($input);

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
            $user = User::find($id);
            if ($user->deactivated_at) {
                $user->deactivated_at = null;
            } else {
                $user->deactivated_at = now();
            }

            $user->save();
            $response = ["data" => $user->deactivated_at];
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            return response()->json($response, 500);
        }
    }
}
