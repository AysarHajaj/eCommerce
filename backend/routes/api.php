<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChildCategoryController;
use App\Http\Controllers\SubCategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

Route::post('register', [AuthenticationController::class, 'register']);
Route::post('login', [AuthenticationController::class, 'login']);
Route::middleware("auth:api")->get('logout', [AuthenticationController::class, 'logout']);
Route::get('unauthenticated', [AuthenticationController::class, 'unauthenticated'])->name('unauthenticated');
Route::resource('categories', CategoryController::class)->middleware("auth:api");
Route::post('categories/{id}', [CategoryController::class, 'update']);
Route::resource('sub_categories', SubCategoryController::class)->middleware("auth:api");
Route::resource('child_categories', ChildCategoryController::class)->middleware("auth:api");
