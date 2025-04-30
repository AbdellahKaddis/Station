<?php 

namespace App\Http\Controllers;

use App\Models\Planning;
use App\Http\Requests\StorePlanningRequest;
use App\Http\Requests\UpdatePlanningRequest;
use App\Http\Resources\PlanningResource;
use Illuminate\Http\Response;

class PlanningController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $plannings = Planning::with('employee')->latest()->get(); // Eager load employee relationship
        return PlanningResource::collection($plannings);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePlanningRequest $request)
    {
        $planning = Planning::create($request->validated());
        return new PlanningResource($planning);
    }

    /**
     * Display the specified resource.
     */
    public function show(Planning $planning)
    {
        return new PlanningResource($planning->load('employee'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlanningRequest $request, Planning $planning)
    {
        $planning->update($request->validated());
        return new PlanningResource($planning);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Planning $planning)
    {
        $planning->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}