<?php
namespace App\Http\Controllers;

use App\Http\Requests\StorePumpRequest;
use App\Http\Requests\UpdatePumpRequest;
use App\Http\Resources\PumpResource;
use App\Models\Pump;
use Illuminate\Http\Response;

class PumpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
            $pumps = Pump::with(['tank.station'])->paginate(10);
            return PumpResource::collection($pumps);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePumpRequest $request)
    {
        $pump = Pump::create($request->validated());
        return new PumpResource($pump);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pump $pump)
    {
        return new PumpResource($pump->load('tank')); // Include tank relationship
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePumpRequest $request, Pump $pump)
    {
        $pump->update($request->validated());
        return new PumpResource($pump);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pump $pump)
    {
        $pump->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}