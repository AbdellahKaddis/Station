<?php

namespace App\Http\Controllers;

use App\Models\FuelType;
use Illuminate\Http\Request;

class FuelTypeController extends Controller
{
    /**
     * Display a listing of the fuel types.
     */
    public function index()
    {
        return response()->json(FuelType::latest()->get(), 200);
    }

    /**
     * Store a newly created fuel type in storage.
     */
    public function store(Request $request)
    {
        $formFields = $request->validate([
            'name' => 'required|string'
        ]);

        $fuelType = FuelType::create($formFields);

        return response()->json($fuelType, 201);
    }

    /**
     * Display the specified fuel type.
     */
    public function show(FuelType $fuelType)
    {
        return response()->json($fuelType, 200);
    }

    /**
     * Update the specified fuel type in storage.
     */
    public function update(Request $request, FuelType $fuelType)
    {
        $formFields = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $fuelType->update($formFields);

        return response()->json($fuelType, 200);
    }

    /**
     * Remove the specified fuel type from storage.
     */
    public function destroy(FuelType $fuelType)
    {
        $fuelType->delete();

        return response()->json(['message' => 'Fuel type deleted successfully'], 204);
    }
}
