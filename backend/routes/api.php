<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FuelController;
use App\Http\Controllers\PumpController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\TankController;
use App\Http\Controllers\StationController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FuelTypeController;
use App\Http\Controllers\PlanningController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\EmailCheckController;
use App\Http\Controllers\StockEntryController;
use App\Http\Controllers\NationalityController;
use App\Http\Controllers\MeterReadingController;
use App\Http\Controllers\EmployeeStationController;
use App\Http\Controllers\PresenceController;
use App\Http\Controllers\SalePriceHistoryController;

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
Route::apiResource('sale-price-history',SalePriceHistoryController::class);
Route::apiResource('meter-readings', MeterReadingController::class);
Route::apiResource('sales', SaleController::class);
Route::get('/meter-reading-by-pump-id/{pumpId}', [MeterReadingController::class, 'getMeterReadingByPumpId']);
Route::get('sale-price/current/{fuelTypeId}',  [SalePriceHistoryController::class, 'getCurrentSalePriceByFuelType']);
Route::apiResource('plannings', PlanningController::class);
Route::apiResource('presences', PresenceController::class);
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
// routes/api.php
use App\Http\Controllers\InvitationController;

// Route::post('/invitations', [InvitationController::class, 'store']);
    // ->middleware('auth:api')
    // ->name('invitations.store');
Route::post('/invitations/send', [InvitationController::class, 'send']);
require __DIR__.'/auth.php';
