<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    public function store(Request $request, $id)
{
    $participant = Participant::create([
        'user_id' => $request->user_id,
        'viatge_id' => $id,
        'rol' => $request->rol ?? 'participant'
    ]);

    return response()->json($participant, 201);
}
}
