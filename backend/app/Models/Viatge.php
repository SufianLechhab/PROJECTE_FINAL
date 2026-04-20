<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Viatge extends Model
{
protected $fillable = [
    'desti',
    'data_inici',
    'data_fi',
    'descripcio',
    'user_id'
];

public function participants()
{
    return $this->hasMany(Participant::class);
}


public function activitats()
{
    return $this->hasMany(Activitat::class);
}
public function user()
{
    return $this->belongsTo(User::class);
}
}