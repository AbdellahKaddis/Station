<?php
namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        // Authenticate the user
        $request->authenticate();

        // Get the authenticated user
        $user = Auth::user();

        // Create a token for the user
        $token = $user->createToken('api-token')->plainTextToken;

        // Return the user and token
        return response()->json([
            'user' => [
    'id' => $user->id,
    'email' => $user->email,
    'role' => $user->role,
            ],
            'token'=> $token
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
        // Get the authenticated user
        $user = Auth::user();

        // Revoke all tokens for the user
        $user->tokens()->delete();

        // Return a success response
        return response()->json(['message' => 'Logged out successfully']);
    }
}