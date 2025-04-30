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
        $presences = Presence::with('employee')->latest()->get(); // Eager load employee relationship
        return PresenceResource::collection($presences);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePresenceRequest $request)
    {
        $presence = Presence::create($request->validated());
        return new PresenceResource($presence);
    }

    /**
     * Display the specified resource.
     */
    public function show(Presence $presence)
    {
        return new PresenceResource($presence->load('employee'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePresenceRequest $request, Presence $presence)
    {
        $presence->update($request->validated());
        return new PresenceResource($presence);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Presence $presence)
    {
        $presence->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}