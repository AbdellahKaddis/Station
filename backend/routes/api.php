<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StationController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmailCheckController;
use App\Http\Controllers\EmployeeStationController;

Route::apiResource('stations',StationController::class);
Route::apiResource('employees', EmployeeController::class);
Route::apiResource('employee-stations',EmployeeStationController::class);
Route::post('check-email', [EmailCheckController::class, 'checkEmail']);
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
require __DIR__.'/auth.php';
