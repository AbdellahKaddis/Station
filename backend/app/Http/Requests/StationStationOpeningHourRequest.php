<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StationStationOpeningHourRequest extends FormRequest
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
        'station_id' => 'required|exists:stations,id',
        'day' => 'required|string|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
        'opening_time' => 'required|date_format:H:i',
        'closing_time' => 'required|date_format:H:i|after:opening_time',
        ];
    }

    public function messages()
    {
        return [
            'closing_time.after' => 'The closing time must be after the opening time.',
        ];
    }
}
