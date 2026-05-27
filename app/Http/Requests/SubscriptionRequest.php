<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

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
            'last_billing' => ['required', 'date_format:Y-m-d', 'before_or_equal:today'],
            'billing_cycle_id' => ['required', 'exists:billing_cycles,id'],
            'category_id' => ['required', 'exists:categories,id'],
            'service_url' => ['required', 'string', 'max:255'],
            'login_identifier' => ['required', 'string', 'max:255'],
            'notes' => ['required', 'string', 'max:255'],
            'free_trial_days' => ['required', 'integer', 'min:1', 'max:365', 'nullable'],
        ];
    }
    // ADICIONADO PARA RETORNAR ERROS DE VALIDAÇÃO COMO JSON, NO MOMENTO NAO FUNCIONA PQ O FRONTEND AINDA NAO TRATA ESSE TIPO DE RESPOSTA, MAS DEIXEI PRONTO PARA FUTURAS MELHORIAS
    public function messages()
    {
        return [
            'name.required' => 'O nome da assinatura é obrigatório.',
            'name.string' => 'O nome deve ser um texto válido.',
            'name.max' => 'O nome não pode ter mais que 255 caracteres.',

            'price.required' => 'O preço é obrigatório.',
            'price.numeric' => 'O preço deve ser um valor numérico.',
            'price.min' => 'O preço não pode ser menor que 0.',

            'last_billing.required' => 'A data do último pagamento é obrigatória.',
            'last_billing.date_format' => 'O campo data do último pagamento deve estar no formato Y-m-d.',
            'last_billing.before_or_equal' => 'A data do último pagamento não pode ser no futuro.',

            'billing_cycle_id.required' => 'O ciclo de cobrança é obrigatório.',
            'billing_cycle_id.exists' => 'O ciclo de cobrança selecionado é inválido.',

            'category_id.required' => 'A categoria é obrigatória.',
            'category_id.exists' => 'A categoria selecionada é inválida.',

            'service_url.required' => 'A URL do serviço é obrigatória.',
            'service_url.string' => 'A URL do serviço deve ser um texto válido.',
            'service_url.max' => 'A URL do serviço não pode ter mais que 255 caracteres.',

            'login_identifier.required' => 'O identificador de login é obrigatório.',
            'login_identifier.string' => 'O identificador de login deve ser um texto válido.',
            'login_identifier.max' => 'O identificador de login não pode ter mais que 255 caracteres.',

            'notes.required' => 'O campo de observações/notas é obrigatório.',
            'notes.string' => 'As observações devem ser um texto válido.',
            'notes.max' => 'As observações não podem ter mais que 255 caracteres.',

            'free_trial_days.required' => 'Os dias de teste grátis são obrigatórios (envie null ou 0 se não houver).',
            'free_trial_days.integer' => 'Os dias de teste grátis devem ser um número inteiro.',
            'free_trial_days.min' => 'Os dias de teste devem ser de no mínimo 1 dia.',
            'free_trial_days.max' => 'Os dias de teste não podem passar de 365 dias.',
        ];
    }
}
