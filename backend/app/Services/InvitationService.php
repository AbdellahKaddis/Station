<?php

namespace App\Services;

use App\Models\Invitation;
use Illuminate\Support\Str;
use App\Mail\InvitationEmail;
use Illuminate\Support\Facades\Mail;

class InvitationService
{
    /**
     * Create a new invitation and return the URL
     */
    public function createInvitation(string $email): string
    {
        $token = Str::random(40);
        $expiresAt = now()->addHours(24);

        Invitation::create([
            'email' => $email,
            'token_hash' => hash('sha256', $token),
            'expires_at' => $expiresAt
        ]);

        return $this->buildUrl($token);
    }

    /**
     * Build the frontend invitation URL
     */
    protected function buildUrl(string $token): string
    {
        $baseUrl = config('app.frontend_url', 'http://localhost:3000');
        return "{$baseUrl}/register?token={$token}";
    }

    /**
     * Verify an invitation token
     */
    public function verifyToken(string $token): bool
    {
        return Invitation::valid()
            ->where('token_hash', hash('sha256', $token))
            ->exists();
    }
    public function sendInvitation(string $email): void
{
    $url = $this->createInvitation($email);
    
    Mail::to($email)
        ->queue(new InvitationEmail($url)); // Queued sending
    
    // For immediate sending (not recommended):
    // Mail::to($email)->send(...);
}

}