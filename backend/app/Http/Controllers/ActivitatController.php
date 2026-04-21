<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Activitat;

class ActivitatController extends Controller
{
    // Crear una nova activitat per un viatge
    public function store(Request $request, $tripId)
    {
        // Validar les dades
        $request->validate([
            'nom' => 'required|string|max:255',
            'data' => 'required|date',
            'hora' => 'required',
            'ubicacio' => 'required|string|max:255',
        ]);

        // Crear activitat
        $activitat = Activitat::create([
            'nom' => $request->nom,
            'data' => $request->data,
            'hora' => $request->hora,
            'ubicacio' => $request->ubicacio,
            'viatge_id' => $tripId
        ]);

        return response()->json($activitat, 201);
    }
}
