<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use App\Models\User;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
public function store(Request $request, $id)
{
    // buscar usuari per email
    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['error' => 'Usuari no trobat'], 404);
    }

    $participant = new Participant();
    $participant->viatge_id = $id;
    $participant->user_id = $user->id;
    $participant->rol = 'participant';
    $participant->save();

    return response()->json($participant, 201);
}}