<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class MaterialRequest extends Model
{
    protected $guarded = array(
        'id',
        'user_id'
    );

    protected $visible = [
        'id', 'created_at', 'title', 'contents', 'iscompleted', 'user_id', 'user', 'requestreplies'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function requestreplies()
    {
        return $this->hasMany('App\RequestReply', 'request_id');
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format("Y/m/d");
    }
}
