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
    public function checkEmail(Request $request)
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

        $emailExists = Station::where('email', $request->email)->exists();

        if ($emailExists) {
            return response()->json(['exists' => true]);
        } else {
            return response()->json(['exists' => false]);
        }
}
}