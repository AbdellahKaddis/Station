<?php

namespace App\Http\Controllers;

use App\Models\Station;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmailCheckController extends Controller
{
    /**
     * Check if the email exists in the database.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function checkEmail(Request $request,$model)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'email' => 'required|email', // Ensure the email is provided and valid
        ]);

        // If validation fails, return a 422 response with errors
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first()
            ], 422);
        }

        $models = [
            'station' => 'App\\Models\\Station',
            'employee' => 'App\\Models\\Employee',
            'supplier' => 'App\\Models\\Supplier',
        ];
    
        $className = $models[$model] ?? null;
    
        if (!$className) {
            return response()->json([
                'error' => 'Invalid model specified.',
            ], 400);
        }
    
        $emailExists = $className::where('email', $request->email)->exists();

        return response()->json([
            'exists' => $emailExists,
        ]);
}
}