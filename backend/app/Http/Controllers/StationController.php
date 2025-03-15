<?php

namespace App\Http\Controllers;

use App\Models\Station;
use Illuminate\Http\Request;
use App\Http\Requests\StoreStationRequest;
use App\Http\Requests\UpdateStationRequest;

class StationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stations = Station::with('openingHours')->get();
        return response()->json($stations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStationRequest $request)
    {
        $station = Station::create($request->validated());

        foreach ($request->validated()['opening_hours'] as $openingHour) {
            $station->openingHours()->create($openingHour);
        }

        return response()->json($station->load('openingHours'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Station $station)
    {
        return response()->json($station->load('openingHours'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStationRequest $request, Station $station)
    {
        // The request is already validated at this point
        $station->update($request->validated());

        // Update or create opening hours
        if (isset($request->validated()['opening_hours'])) {
            foreach ($request->validated()['opening_hours'] as $openingHour) {
                if (isset($openingHour['id'])) {
                    $station->openingHours()->where('id', $openingHour['id'])->update($openingHour);
                } else {
                    $station->openingHours()->create($openingHour);
                }
            }
        }

        return response()->json($station->load('openingHours'));
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Station $station)
    {
        $station->delete();
        return response()->json(null, 204);
    }
}
