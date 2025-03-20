<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMeterReadingRequest;
use App\Http\Requests\UpdateMeterReadingRequest;
use App\Http\Resources\MeterReadingResource;
use App\Models\MeterReading;
use Illuminate\Http\JsonResponse;

class MeterReadingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $meterReadings = MeterReading::with('pump')->paginate(10);
        return response()->json(MeterReadingResource::collection($meterReadings));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMeterReadingRequest $request): JsonResponse
    {
        $meterReading = MeterReading::create($request->validated());
        return response()->json(new MeterReadingResource($meterReading), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(MeterReading $meterReading): JsonResponse
    {
        return response()->json(new MeterReadingResource($meterReading));
    }

    public function getMeterReadingByPumpId($pumpId)
    {
        $meterReading= MeterReading::where('pump_id',$pumpId)->first();
        if ($meterReading) {
            return   new MeterReadingResource($meterReading);
        } else {
            return response()->json(['message' => 'Meter reading not found for this pump.'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMeterReadingRequest $request, MeterReading $meterReading): JsonResponse
    {
        $meterReading->update($request->validated());
        return response()->json(new MeterReadingResource($meterReading));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MeterReading $meterReading): JsonResponse
    {
        $meterReading->delete();
        return response()->json(null, 204);
    }
}