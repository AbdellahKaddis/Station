<?php
namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\Tank;

class TankMatchesFuelType implements ValidationRule
{
    public function __construct(private int $fuelTypeId)
    {
        //
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Check if the tank exists and has the correct fuel_type_id
        $tank = Tank::find($value);

        if (!$tank || $tank->fuel_type_id !== $this->fuelTypeId) {
            $fail("The selected tank does not match the provided fuel type.");
        }
    }
}
