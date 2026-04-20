<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    
protected $fillable = [
    'user_id',
    'viatge_id',
    'rol'
];

public function viatge()
{
    return $this->belongsTo(Viatge::class);
}
public function user()
{
    return $this->belongsTo(User::class);
}
}
