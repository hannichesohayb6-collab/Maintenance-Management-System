<?php

namespace App\Http\Requests\Technician;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreOfferRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->role === 'technician';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'offer_description' => ['required', 'string'],
            'estimated_cost' => ['required', 'numeric', 'min:0'],
            'estimated_days' => ['required', 'integer', 'min:1'],
        ];
    }
}
