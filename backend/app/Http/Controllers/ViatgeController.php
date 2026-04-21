<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Viatge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class ViatgeController extends Controller
{
public function index()
{
    return response()->json(
        Viatge::with('participants.user', 'activitats')->get()
    );
}
    public function store(Request $request)
    {
        $viatge = Viatge::create([
            'desti' => $request->desti,
            'data_inici' => $request->data_inici,
            'data_fi' => $request->data_fi,
            'descripcio' => $request->descripcio,
            'user_id' => Auth::id(),
        ]);
        return response()->json($viatge, 201);
    }

    //     public function store(Request $request)
    // {
    //     dd($request->all());
    // }

    public function show($id)
    {
        return Viatge::findOrFail($id);
    }

public function update(Request $request, $id)
{
    $viatge = Viatge::findOrFail($id);

    $viatge->update($request->all());

    return response()->json($viatge);
}

    public function destroy($id)
    {
        Viatge::destroy($id);
        return response()->json(null, 204);
    }
}
