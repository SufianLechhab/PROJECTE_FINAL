<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Viatge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ViatgeController extends Controller
{
    // Llistar viatges de l'usuari
public function index()
{
    return response()->json(
        Viatge::with('participants.user', 'activitats')
            ->where('user_id', Auth::id()) // creador
            ->orWhereHas('participants', function ($q) {
                $q->where('user_id', Auth::id()); // participant
            })
            ->get()
    );
}

    // Crear viatge
    public function store(Request $request)
    {
        $request->validate([
            'desti' => 'required',
            'data_inici' => 'required|date',
            'data_fi' => 'required|date',
        ]);

        $viatge = Viatge::create([
            'desti' => $request->desti,
            'data_inici' => $request->data_inici,
            'data_fi' => $request->data_fi,
            'descripcio' => $request->descripcio,
            'user_id' => Auth::id(),
        ]);

        return response()->json($viatge, 201);
    }

    // Mostrar un viatge
    public function show($id)
    {
        $viatge = Viatge::with('participants.user', 'activitats')
            ->findOrFail($id);

        if (
            $viatge->user_id !== Auth::id() &&
            !$viatge->participants()->where('user_id', Auth::id())->exists()
        ) {
            return response()->json(['error' => 'No autoritzat'], 403);
        }

        return response()->json($viatge);
    }

    // Actualitzar viatge
    public function update(Request $request, $id)
    {
        $viatge = Viatge::findOrFail($id);

        // 🔐 comprovar permisos
        if ($viatge->user_id !== Auth::id()) {
            return response()->json(['error' => 'No autoritzat'], 403);
        }

        $request->validate([
            'desti' => 'required',
            'data_inici' => 'required|date',
            'data_fi' => 'required|date',
        ]);

        $viatge->update($request->all());

        return response()->json($viatge);
    }

    //  Eliminar viatge
    public function destroy($id)
    {
        $viatge = Viatge::findOrFail($id);

        // comprovar permisos
        if ($viatge->user_id !== Auth::id()) {
            return response()->json(['error' => 'No autoritzat'], 403);
        }

        $viatge->delete();

        return response()->json(null, 204);
    }
}
