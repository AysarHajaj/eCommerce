<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChildCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\UserController;
use App\Models\Category;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//authentication apis
Route::post('register', [AuthenticationController::class, 'register']);
Route::post('login', [AuthenticationController::class, 'login']);
Route::middleware("auth:api")->get('logout', [AuthenticationController::class, 'logout']);
Route::get('unauthenticated', [AuthenticationController::class, 'unauthenticated'])->name('unauthenticated');

//categories apis
Route::resource('categories', CategoryController::class);
Route::post('categories/{id}', [CategoryController::class, 'update']);
Route::post('categories/{id}/change_status', [CategoryController::class, 'changeStatus']);

//sub categories apis
Route::resource('sub_categories', SubCategoryController::class);
Route::post('sub_categories/{id}/change_status', [SubCategoryController::class, 'changeStatus']);

//child categories apis
Route::resource('child_categories', ChildCategoryController::class);
Route::post('child_categories/{id}/change_status', [ChildCategoryController::class, 'changeStatus']);

//vendor apis
Route::prefix('vendors')->group(function () {
    Route::post('/', [UserController::class, 'storeVendor']);
    Route::get('/', [UserController::class, 'getVendors']);
    Route::get('/{id}', [UserController::class, 'getVendor']);
    Route::delete('/{id}', [UserController::class, 'deleteVendor']);
    Route::post('/{id}', [UserController::class, 'updateVendor']);
    Route::post('/{id}/change_status', [UserController::class, 'changeStatus']);
});

//Shop apis
Route::prefix('shops')->group(function () {
    Route::get('/{id}', [ShopController::class, 'show']);
    Route::post('/{id}', [ShopController::class, 'update']);
    Route::get('/vendor/{vendorId}', [ShopController::class, 'showByVendorId']);
});

//products apis
Route::resource('products', ProductController::class);
Route::post('products/{id}', [ProductController::class, 'update']);
Route::post('products/{id}/change_status', [ProductController::class, 'changeStatus']);
Route::get('products/vendor/{vendorId}', [ProductController::class, 'getProductsByVendorId']);
