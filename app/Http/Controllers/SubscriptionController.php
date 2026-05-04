<?php

namespace App\Http\Controllers;

use App\Data\Subscription\CreateSubscriptionData;
use App\Data\Subscription\UpdateSubscriptionData;
use App\Http\Requests\SubscriptionEditRequest;
use App\Models\BillingCycle;
use App\Models\Category;
use App\Http\Requests\SubscriptionRequest;
use App\Models\BillingHistory;
use App\Models\Subscription;
use App\Services\BillingHistoryService;
use App\Services\CheckExpiringSubscriptionService;
use App\Services\SubscriptionService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class SubscriptionController extends Controller
{

    public function __construct(private SubscriptionService $service) {}

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
        $data = CreateSubscriptionData::fromRequest($request);

        $subscription = $this->service->create($data);

        return redirect()->route('subscriptions.show', $subscription->id)->with('success', 'Assinatura criada com sucesso!');
    }

    public function show(Int $id)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $subscription = $user->subscriptions()->with('billingCycle', 'category')->find($id);

        if(!$subscription) {
            return redirect()->back()->with('error', 'Erro ao visualizar assinatura');
        }

        $total_paid = $subscription->billingHistories()->where('type', 'A')->sum('amount');
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

    public function edit(Int $id)
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

    public function update(SubscriptionEditRequest $request, Subscription $subscription)
    {
        if(Auth::id() !== $subscription->user_id) return redirect()->back()->with('error', 'Erro ao editar assinatura');

        $data = UpdateSubscriptionData::fromRequest($request);

        $this->service->update($subscription, $data);

        return redirect()->route('subscriptions.show', $subscription->id)->with('success', 'Assinatura atualizada com sucesso!');
    }

    public function toggleActive(Int $id)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $subscription = $user->subscriptions()->whereKey($id)->first();

        if (!$subscription) {
            return redirect()->back()->withErrors(['error' => 'Assinatura não encontrada']);
        }

        $this->service->toggle($subscription);

        return redirect()->back()->with(
            'success',
            $subscription->is_active
                ? 'Assinatura ativada com sucesso!'
                : 'Assinatura inativada com sucesso!',
        );
    }

    public function history(Int $id)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $subscription = $user->subscriptions()->whereKey($id)->first();

        if (!$subscription) {
            return redirect()->back()->withErrors(['error' => 'Assinatura não encontrada']);
        }

        return inertia('subscriptions/History', [
            'subscription' => $subscription,
            'histories' => $subscription->billingHistories()->with('subscription.billingCycle')->get()
        ]);
    }
}
