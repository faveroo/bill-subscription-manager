<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service\DashboardLoaderService;

class MainController extends Controller
{
    public function dashboard()
    {
        $dashboardData = (new DashboardLoaderService)->load();

        return inertia('main/Dashboard', $dashboardData);
    }
}
