<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Comment extends Model
{
    protected $visible = [
        'user', 'content', 'id', 'created_at'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format("Y/m/d");
    }
}
