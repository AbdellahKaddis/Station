<?php 

namespace App\Http\Controllers;

use App\Http\Requests\StoreSaleRequest;
use App\Http\Requests\UpdateSaleRequest;
use App\Http\Resources\SaleResource;
use App\Models\Sale;
use Illuminate\Http\JsonResponse;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $sales = Sale::with(['salePriceHistory', 'meterReading.pump'])->latest()->get();
        return response()->json(SaleResource::collection($sales));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSaleRequest $request): JsonResponse
    {
        $sale = Sale::create($request->validated());
        return response()->json(new SaleResource($sale), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale): JsonResponse
    {
        return response()->json(new SaleResource($sale));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSaleRequest $request, Sale $sale): JsonResponse
    {
        $sale->update($request->validated());
        return response()->json(new SaleResource($sale));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale): JsonResponse
    {
        $sale->delete();
        return response()->json(null, 204);
    }
}