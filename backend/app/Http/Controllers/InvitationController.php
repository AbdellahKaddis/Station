<?php

namespace App\Http\Controllers;
use App\Models\Invitation;
use Illuminate\Support\Str;
use App\Mail\InvitationEmail;
use Illuminate\Http\JsonResponse;
use App\Services\InvitationService;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\StoreInvitationRequest;

class InvitationController extends Controller
{
    public function __construct(protected InvitationService $invitationService)
        {
            
        }
    
        public function store(StoreInvitationRequest $request)
        {
            $url = $this->invitationService->createInvitation($request->email);
    
            return response()->json([
                'data' => [
                    'invitation_url' => $url,
                    'expires_in' => '24 hours'
                ]
            ], 201);
        }

        public function send(StoreInvitationRequest $request): JsonResponse
        {
            try {
                $this->invitationService->sendInvitation($request->email);
    
                return response()->json([
                    'message' => 'Invitation sent successfully',
                    'expires_in' => '24 hours'
                ], 201);
    
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Failed to send invitation',
                    'details' => config('app.debug') ? $e->getMessage() : null
                ], 500);
            }
        }
}
