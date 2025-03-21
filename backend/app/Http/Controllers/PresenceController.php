<?php 

namespace App\Http\Controllers;

use App\Http\Requests\StorePresenceRequest;
use App\Http\Requests\UpdatePresenceRequest;
use App\Http\Resources\PresenceResource;
use App\Models\Presence;
use Illuminate\Http\Response;

class PresenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $plannings = Presence::with('employee')->get(); // Eager load employee relationship
        return PresenceResource::collection($plannings);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePresenceRequest $request)
    {
        $planning = Presence::create($request->validated());
        return new PresenceResource($planning);
    }

    /**
     * Display the specified resource.
     */
    public function show(Presence $planning)
    {
        return new PresenceResource($planning->load('employee'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePresenceRequest $request, Presence $planning)
    {
        $planning->update($request->validated());
        return new PresenceResource($planning);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Presence $planning)
    {
        $planning->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}