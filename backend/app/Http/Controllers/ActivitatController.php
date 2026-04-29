<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Activitat;
use App\Models\Viatge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ActivitatController extends Controller
{
    // Llistar activitats d’un viatge
public function index(Request $request, $tripId)
{
    $viatge = Viatge::findOrFail($tripId);

    if (
        $viatge->user_id !== Auth::id() &&
        !$viatge->participants()->where('user_id', Auth::id())->exists()
    ) {
        return response()->json(['error' => 'No autoritzat'], 403);
    }

    $query = Activitat::where('viatge_id', $tripId);

    //  FILTRE PER RANG DE DATES
    if ($request->has('data_inici') && $request->has('data_fi')) {
        $query->whereBetween('data', [
            $request->data_inici,
            $request->data_fi
        ]);
    }

    return response()->json($query->get());
}

    // Crear activitat
    public function store(Request $request, $tripId)
    {
        $viatge = Viatge::findOrFail($tripId);

        //  permisos
        if (
            $viatge->user_id !== Auth::id() &&
            !$viatge->participants()->where('user_id', Auth::id())->exists()
        ) {
            return response()->json(['error' => 'No autoritzat'], 403);
        }

        // validar dades
        $request->validate([
            'nom' => 'required|string|max:255',
            'data' => 'required|date',
            'hora' => 'required',
            'ubicacio' => 'required|string|max:255',
        ]);

        $activitat = Activitat::create([
            'nom' => $request->nom,
            'data' => $request->data,
            'hora' => $request->hora,
            'ubicacio' => $request->ubicacio,
            'viatge_id' => $tripId
        ]);

        return response()->json($activitat, 201);
    }

    // Editar activitat
    public function update(Request $request, $id)
    {
        $activitat = Activitat::findOrFail($id);
        $viatge = Viatge::findOrFail($activitat->viatge_id);

        // permisos
        if (
            $viatge->user_id !== Auth::id() &&
            !$viatge->participants()->where('user_id', Auth::id())->exists()
        ) {
            return response()->json(['error' => 'No autoritzat'], 403);
        }

        $request->validate([
            'nom' => 'required|string|max:255',
            'data' => 'required|date',
            'hora' => 'required',
            'ubicacio' => 'required|string|max:255',
        ]);

        $activitat->update($request->only([
            'nom',
            'data',
            'hora',
            'ubicacio'
        ]));

        return response()->json($activitat);
    }

    // eliminar activitat
    public function destroy($id)
    {
        $activitat = Activitat::findOrFail($id);
        $viatge = Viatge::findOrFail($activitat->viatge_id);

        // 🔐 permisos
        if (
            $viatge->user_id !== Auth::id() &&
            !$viatge->participants()->where('user_id', Auth::id())->exists()
        ) {
            return response()->json(['error' => 'No autoritzat'], 403);
        }

        $activitat->delete();

        return response()->json(null, 204);
    }
}