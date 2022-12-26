<?php

namespace App\Http\Controllers;

use App\Constants\UserTypes;
use App\Models\Shop;
use App\Models\User;
use App\Traits\ImageTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    use ImageTrait;

    public function storeVendor(Request $request)
    {
        DB::beginTransaction();
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
                $input['image'] = $this->saveImage($image, 'users');
            } else {
                $input['image'] = null;
            }

            $input['password'] = bcrypt($request->password);
            $input['type'] = UserTypes::VENDOR;

            $user = User::create($input);
            $shop = Shop::create([
                'user_id' => $user->id
            ]);

            $response = ["result" => "success"];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }

    public function getVendors()
    {
        DB::beginTransaction();
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
                $vendor->image = $this->getImageUrl($vendor->image);
                return $vendor;
            });

            $response = ["result" => $vendors];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }

    public function getVendor($id)
    {
        DB::beginTransaction();
        try {
            $vendor = User::select('id', 'name', 'image', 'deactivated_at', 'email')->find($id);
            if ($vendor) {
                $vendor->image = $this->getImageUrl($vendor->image);
            } else {
                $response = ["error" => "model not found"];
                return response()->json($response, 404);
            }

            $response = ["result" => $vendor];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }

    public function deleteVendor($id)
    {
        DB::beginTransaction();
        try {
            $vendor = User::find($id);
            if ($vendor) {
                $vendor->delete();
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

    public function updateVendor(Request $request, $id)
    {
        DB::beginTransaction();
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
                $input['image'] = $this->saveImage($image, 'users');
            }
            if ($request->filled("password")) {
                $input['password'] = bcrypt($request->password);
            }

            User::where('id', $id)->update($input);
            DB::commit();
            $response = ["result" => "success"];
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
            $user = User::find($id);

            if ($user) {
                if ($user->deactivated_at) {
                    $user->deactivated_at = null;
                } else {
                    $user->deactivated_at = now();
                }
            } else {
                $response = ["error" => "model not found"];
                return response()->json($response, 404);
            }

            $user->save();

            $response = ["result" => $user->deactivated_at];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }

    public function getVendorsByShopCategoryId($shopCategoryId)
    {
        DB::beginTransaction();
        try {
            $vendors = User::with(['shop'])
                ->whereHas('shop', function ($q) use ($shopCategoryId) {
                    $q->where('shop_category_id', $shopCategoryId);
                })
                ->whereNull('deactivated_at')
                ->where('type', UserTypes::VENDOR)
                ->select(
                    'users.id',
                    'name',
                    'email',
                    'image',
                    'deactivated_at'
                )->get();

            $vendors->map(function ($vendor) {
                $vendor->image = $this->getImageUrl($vendor->image);
                $vendor->shop->image = $this->getImageUrl($vendor->shop->image);
                return $vendor;
            });

            $response = ["result" => $vendors];
            DB::commit();
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            DB::rollBack();
            return response()->json($response, 500);
        }
    }
}
