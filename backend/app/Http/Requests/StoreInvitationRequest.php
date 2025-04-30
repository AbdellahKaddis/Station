<?php
// app/Http/Requests/StoreInvitationRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreInvitationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email'),
                Rule::unique('invitations', 'email')->where(function ($query) {
                    return $query->where('expires_at', '>', now());
                }),
            ],
        ];
    }
}