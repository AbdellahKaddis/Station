<?php

namespace App\Http\Controllers;

use App\Models\Tank;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Resources\TankResource;
use App\Http\Requests\StoreTankRequest;
use App\Http\Requests\UpdateTankRequest;

class TankController extends Controller
{
    public function index()
    {
        $tanks = Tank::latest()->get(); // Paginate results
        return TankResource::collection($tanks);
    }

    public function store(StoreTankRequest $request)
    {
        $tank = Tank::create($request->validated());
        return new TankResource($tank, Response::HTTP_CREATED);
    }

    public function show(Tank $tank)
    {
        return new TankResource($tank);
    }

    public function update(UpdateTankRequest $request, Tank $tank)
    {
        $tank->update($request->validated());
        return new TankResource($tank);
    }

    public function destroy(Tank $tank)
    {
        $tank->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}