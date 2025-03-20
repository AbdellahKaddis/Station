<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\SalePriceHistory;
use App\Http\Resources\SalePriceHistoryResource;
use App\Http\Requests\StoreSalePriceHistoryRequest;
use App\Http\Requests\UpdateSalePriceHistoryRequest;

class SalePriceHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $salePriceHistories = SalePriceHistory::paginate(10);
        return SalePriceHistoryResource::collection($salePriceHistories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSalePriceHistoryRequest $request)
    {
        $salePriceHistory = SalePriceHistory::create($request->validated());
        return new SalePriceHistoryResource($salePriceHistory, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(SalePriceHistory $salePriceHistory)
    {
        return new SalePriceHistoryResource($salePriceHistory);
    }
    public function getCurrentSalePriceByFuelType($fuelTypeId)
    {
        $salePrice= SalePriceHistory::where('fuel_type_id',$fuelTypeId)->where('end_date',null)->first();
        if ($salePrice) {
            return   new SalePriceHistoryResource($salePrice);
        } else {
            return response()->json(['message' => 'sale price is not found'], 404);
        }
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSalePriceHistoryRequest $request, SalePriceHistory $salePriceHistory)
    {
        $salePriceHistory->update($request->validated());
        return new SalePriceHistoryResource($salePriceHistory);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SalePriceHistory $salePriceHistory)
    {
        $salePriceHistory->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
