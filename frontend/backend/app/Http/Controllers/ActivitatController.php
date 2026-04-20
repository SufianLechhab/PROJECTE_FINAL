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
        $activitat = new Activitat();
        $activitat->trip_id = $tripId;
        $activitat->nom = $request->nom;
        $activitat->data = $request->data;
        $activitat->hora = $request->hora;
        $activitat->ubicacio = $request->ubicacio;
        $activitat->save();

        return response()->json($activitat, 201);
    }
}