<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FuelController;
use App\Http\Controllers\PumpController;
use App\Http\Controllers\TankController;
use App\Http\Controllers\StationController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FuelTypeController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\EmailCheckController;
use App\Http\Controllers\StockEntryController;
use App\Http\Controllers\NationalityController;
use App\Http\Controllers\EmployeeStationController;

Route::apiResource('stations',StationController::class);
Route::apiResource('employees', EmployeeController::class);
Route::apiResource('employee-stations',EmployeeStationController::class);
Route::apiResource('fuel-types',FuelTypeController::class);
Route::apiResource('tanks',TankController::class);
Route::apiResource('pumps', PumpController::class);
Route::post('/check-email/{model}', [EmailCheckController::class, 'checkEmail']);
Route::get('/nationalities',[NationalityController::class,'index']);


Route::apiResource('suppliers', SupplierController::class);

Route::apiResource('stock-entries', StockEntryController::class);
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
require __DIR__.'/auth.php';
