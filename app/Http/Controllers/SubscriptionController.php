<?php

namespace App\Http\Controllers;

use App\Models\BillingCycle;
use App\Models\Category;
use App\Http\Requests\SubscriptionRequest;
use App\Services\CheckExpiringSubscriptionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{   
    public function index()
    {   
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $subscriptions = $user->subscriptions()->with('billingCycle', 'category')->get();

        return inertia('subscriptions/Index', [
            'subscriptions' => $subscriptions,
            'categories' => Category::select('id', 'name')->get()
        ]);
    }
    public function create()
    {
        return inertia('subscriptions/New', [
            'billingCycles' => BillingCycle::select('id', 'name')->get(),
            'categories' => Category::select('id', 'name')->get()
        ]);
    }

    public function store(SubscriptionRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $subscription = $user->subscriptions()->create($data);
        return redirect()->route('subscriptions.show', $subscription->id)->with('success', 'Assinatura criada com sucesso!');
    }

    public function show($id)
    {
            /** @var \App\Models\User $user */
            $user = Auth::user();
            $subscription = $user->subscriptions()->with('billingCycle', 'category')->find($id);

            $total_paid = $subscription->billingHistories()->sum('amount');
            $subscription->total_paid = $total_paid;

            if (!$subscription) {
                return redirect()
                    ->route('subscriptions.index')
                    ->with('error', 'Assinatura não encontrada.');
            }

            return inertia('subscriptions/Subscription', [
                'subscription' => $subscription
            ]);
    }

    public function edit($id)
    {
            /** @var \App\Models\User $user */
            $user = Auth::user();
            $subscription = $user->subscriptions()->with('billingCycle', 'category')->findOrFail($id);

            return inertia('subscriptions/Edit', [
                'subscription' => $subscription,
                'categories' => Category::select('id', 'name')->get(),
                'billingCycles' => BillingCycle::select('id', 'name')->get()
            ]);
    }

    public function update(SubscriptionRequest $request, $id)
    {
        $data = $request->validated();

        if(!$request->user()->subscriptions()->whereKey($id)->exists()) {
            return redirect()->back()->with(['error' => 'Assinatura não encontrada']);
        }

        $subscription = $request->user()->subscriptions()->findOrFail($id);

        if(!$subscription->is_active) {
            return back()->with(['error' => 'Não é possível editar uma assinatura inativa. Por favor, ative a assinatura antes de editá-la.']);
        }

        $previousLastBilling = optional($subscription->last_billing)->toDateString();

        $subscription->update($data);

        if ($data['last_billing'] !== $previousLastBilling) {
            CheckExpiringSubscriptionService::handle();
        }
        return redirect()->route('subscriptions.show', $subscription->id)->with('success', 'Assinatura atualizada com sucesso!');
    }

    public function toggleActive($id)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $subscription = $user->subscriptions()->whereKey($id)->first();

        if (!$subscription) {
            return redirect()->back()->withErrors(['error' => 'Assinatura não encontrada']);
        }

        $subscription->update(['is_active' => !$subscription->is_active]);

        return redirect()->back()->with(
            'success',
            $subscription->is_active
                ? 'Assinatura ativada com sucesso!'
                : 'Assinatura inativada com sucesso!',
        );
    }
}
