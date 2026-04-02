<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['id', 'name', 'created_at', 'updated_at'])]
class Category extends Model
{
    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }
}
