<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStationRequest extends FormRequest
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
            'name' => 'sometimes|string|max:255',
            'address' => 'sometimes|string|max:255',
            'city' => 'sometimes|string|max:255',
            'service_start_date' => 'sometimes|date',
            'latitude' => 'sometimes|numeric|between:-90,90',
            'longitude' => 'sometimes|numeric|between:-180,180',
            'phone' => 'sometimes|string|max:20',
            'email' => 'sometimes|string|email|max:255|unique:stations,email,' . $this->station->id,
            'status' => 'sometimes|string|in:active,inactive',
            'opening_hours' => 'sometimes|array',
            'opening_hours.*.id' => 'sometimes|exists:station_opening_hours,id',
            'opening_hours.*.day' => 'sometimes|string|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'opening_hours.*.opening_time' => 'sometimes|date_format:H:i',
            'opening_hours.*.closing_time' => 'sometimes|date_format:H:i|after:opening_hours.*.opening_time',
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
