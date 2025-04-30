<?php
namespace App\Http\Controllers;

use App\Models\StockEntry;
use Illuminate\Http\Response;
use App\Http\Requests\StockEntryUpdateRequest;
use App\Http\Requests\StoreStockEntryRequest;
use App\Http\Requests\UpdateStockEntryRequest;
use App\Http\Resources\StockEntryResource;


class StockEntryController extends Controller
{
    // List all stock entries with pagination
    public function index()
    {
        $stockEntries = StockEntry::with(['tank', 'fuelType', 'supplier'])->latest()->paginate(10);
        return StockEntryResource::collection($stockEntries);
    }

    // Store a new stock entry
    public function store(StoreStockEntryRequest $request)
    {
        $stockEntry = StockEntry::create($request->validated());

        return new StockEntryResource($stockEntry->load(['tank', 'fuelType', 'supplier']));
    }

    // Show a single stock entry
    public function show(StockEntry $stockEntry)
    {
        return new StockEntryResource($stockEntry->load(['tank', 'fuelType', 'supplier']));
    }

    // Update an existing stock entry
    public function update(UpdateStockEntryRequest $request, StockEntry $stockEntry)
    {
        $stockEntry->update($request->validated());

        return new StockEntryResource($stockEntry->load(['tank', 'fuelType', 'supplier']));
    }

    // Delete a stock entry
    public function destroy(StockEntry $stockEntry)
    {
        $stockEntry->delete();

        return response()->json(['message' => 'Stock entry deleted successfully'], Response::HTTP_NO_CONTENT);
    }
}
