<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EmployeeStation;
use App\Http\Resources\EmployeeStationResource;
use App\Http\Requests\StoreEmployeeStationRequest;
use App\Http\Requests\UpdateEmployeeStationRequest;

class EmployeeStationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employeeStations = EmployeeStation::with(['employee', 'station'])->paginate(10);
        return EmployeeStationResource::collection($employeeStations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeStationRequest $request)
    {
        $employeeStation = EmployeeStation::create($request->validated());
        return new EmployeeStationResource($employeeStation);
    }

    /**
     * Display the specified resource.
     */
    public function show(EmployeeStation $employeeStation)
    {
        return new EmployeeStationResource($employeeStation->load(['employee', 'station']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeStationRequest $request, EmployeeStation $employeeStation)
    {
        $employeeStation->update($request->validated());

        return new EmployeeStationResource($employeeStation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EmployeeStation $employeeStation)
    {
        $employeeStation->delete();

        return response()->json(null, 204);
    }
}
