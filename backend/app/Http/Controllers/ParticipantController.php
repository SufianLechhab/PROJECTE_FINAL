<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ParticipantController extends Controller
{

public function store(Request $request, $id)
{
    $request->validate([
        'email' => 'required|email',
    ]);

    //  buscar usuari
    $user = User::where('email', $request->email)->first();

    $userExistent = true;

    //  si no existeix → crear-lo
    if (!$user) {
        $userExistent = false;

        $user = User::create([
            'name' => explode('@', $request->email)[0],
            'email' => $request->email,
            'password' => Hash::make('123456'),
        ]);
    }

    // evitar duplicats
    $existeix = Participant::where('viatge_id', $id)
        ->where('user_id', $user->id)
        ->first();

    if ($existeix) {
        return response()->json(['message' => 'Ja és participant'], 400);
    }

    //  afegir participant
    Participant::create([
        'viatge_id' => $id,
        'user_id' => $user->id,
    ]);

    return response()->json([
        'message' => 'Participant afegit',
        'creat' => !$userExistent
    ]);
}
}