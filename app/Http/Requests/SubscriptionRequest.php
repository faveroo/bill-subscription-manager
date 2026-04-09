<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubscriptionRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'billing_cycle_id' => ['required', 'exists:billing_cycles,id'],
            'last_billing' => ['required', 'date_format:Y-m-d', 'before_or_equal:today'],
            'category_id' => ['required', 'exists:categories,id'],
        ];
    }

    public function messages()
    {
        return [
            'last_billing.date_format' => 'O campo data do último pagamento deve estar no formato Y-m-d.',
            'last_billing.before_or_equal' => 'A data do último pagamento não pode ser no futuro.',
        ];
    }
}
