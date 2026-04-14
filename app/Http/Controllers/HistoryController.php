<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function index()
    {
        $histories = auth()->user()->billingHistories()->with('subscription.billingCycle')->latest()->paginate(10);
        return inertia('history/Index', [
            'histories' => $histories,
        ]);
    }
}
