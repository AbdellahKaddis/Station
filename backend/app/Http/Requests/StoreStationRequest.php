<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'service_start_date' => 'required|date',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'phone' => 'required|string|max:20',
            'email' => 'required|string|email|max:255|unique:stations,email',
            'status' => 'required|string|in:active,inactive',
            'opening_hours' => 'required|array',
            'opening_hours.*.day' => 'required|string|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'opening_hours.*.opening_time' => 'required|date_format:H:i',
            'opening_hours.*.closing_time' => 'required|date_format:H:i|after:opening_hours.*.opening_time',
        ];
    }
    public function messages()
    {
        return [
            'email.unique' => 'The email address is already in use.',
            'closing_time.after' => 'The closing time must be after the opening time.',
        ];
    }
}
