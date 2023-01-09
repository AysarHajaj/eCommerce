<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ShopCategoryController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\ProductSubCategoryController;
use App\Http\Controllers\UserController;
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

//shop categories apis
Route::resource('shop-categories', ShopCategoryController::class);
Route::post('shop-categories/{id}', [ShopCategoryController::class, 'update']);
Route::post('shop-categories/{id}/change_status', [ShopCategoryController::class, 'changeStatus']);

//product categories apis
Route::resource('product-categories', ProductCategoryController::class);
Route::post('product-categories/{id}', [ProductCategoryController::class, 'update']);
Route::post('product-categories/{id}/change_status', [ProductCategoryController::class, 'changeStatus']);
Route::get('product-categories/vendor/{id}', [ProductCategoryController::class, 'getByVendorId']);

//product sub categories apis
Route::resource('product-sub-categories', ProductSubCategoryController::class);
Route::post('product-sub-categories/{id}/change_status', [ProductSubCategoryController::class, 'changeStatus']);
Route::get('product-sub-categories/vendor/{id}', [ProductSubCategoryController::class, 'getByVendorId']);


//city apis
Route::resource('cities', CityController::class);
Route::post('cities/{id}/change_status', [CityController::class, 'changeStatus']);

//district apis
Route::resource('districts', DistrictController::class);
Route::post('districts/{id}/change_status', [DistrictController::class, 'changeStatus']);

//currency apis
Route::resource('currencies', CurrencyController::class);
Route::post('currencies/{id}/change_status', [CurrencyController::class, 'changeStatus']);


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
    Route::post('/{id}', [ShopController::class, 'update']);
    Route::get('/vendor/{vendorId}', [ShopController::class, 'showByVendorId']);
});

//products apis
Route::resource('products', ProductController::class);
Route::post('products/{id}/change_status', [ProductController::class, 'changeStatus']);
Route::get('products/vendor/{vendorId}', [ProductController::class, 'getProductsByVendorId']);
Route::post('products/by-ids', [ProductController::class, 'getProductByIds']);
Route::post('products/choices/by-ids', [ProductController::class, 'getChoicesByIds']);
Route::post('products/{id}', [ProductController::class, 'update']);
Route::put('products/choice-group/{id}', [ProductController::class, 'updateChoiceGroup']);
Route::put('products/choice/{id}', [ProductController::class, 'updateChoice']);
Route::delete('/products/choice-group/{id}', [ProductController::class, 'destroyChoiceGroup']);
Route::delete('/products/choice/{id}', [ProductController::class, 'destroyChoice']);


//public apis
Route::prefix('public')->group(function () {
    Route::get('shop-categories/active', [ShopCategoryController::class, 'getActiveCategories']);
    Route::get('vendors/active', [UserController::class, 'getActiveVendors']);
    Route::get('{vendor_id}/categories', [ProductCategoryController::class, 'getCategoriesByShopVendorId']);
    Route::get('product/{id}', [ProductController::class, 'getSingleProduct']);
    Route::get('{vendor_id}/products', [ProductController::class, 'getActiveProductsByVendorId']);
    Route::get('{vendor_id}/{category_id}/products', [ProductController::class, 'getActiveProductsByVendorIdAndCategoryId']);
});

//order apis
Route::prefix('orders')->group(function () {
    Route::post('/', [OrderController::class, 'store']);
    Route::delete('/{id}', [OrderController::class, 'destroy']);
    Route::get('/{status}/{vendorId}', [OrderController::class, 'getOrders']);
});
