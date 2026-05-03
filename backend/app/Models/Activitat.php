<?php

namespace App\Models;

use App\Models\Viatge;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activitat extends Model
{
    use HasFactory;

    protected $fillable = [
        'viatge_id',
        'nom',
        'descripcio',
        'data',
        'hora',
        'ubicacio'
    ];

    public function viatge()
    {
        return $this->belongsTo(Viatge::class, 'viatge_id');
    }

    public function usuaris()
{
    return $this->belongsToMany(User::class);
}
}
