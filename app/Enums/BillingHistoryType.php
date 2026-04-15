<?php

namespace App\Enums;

enum BillingHistoryType: string
{
    case ACTIVATION = 'A';
    case REACTIVATION = 'R';
    case CANCELLATION = 'C';
    case PAID = 'P';
}
