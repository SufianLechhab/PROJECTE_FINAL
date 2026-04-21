<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
class AuthController extends Controller
{
    // ---------------- REGISTER ----------------
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // 🔥 crear token automàtic després de registrar
        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'message' => 'Usuari creat correctament',
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer'
        ], 201);
    }

    // ---------------- LOGIN ----------------
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // 🔐 comprovar credencials
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Credencials incorrectes'
            ], 401);
        }

        $user = Auth::user();

        // 🔥 crear token
        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'message' => 'Login correcte',
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    // ---------------- LOGOUT ----------------
    public function logout(Request $request)
    {
        // eliminar token actual
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout correcte'
        ]);
    }

    // ---------------- USER INFO ----------------
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}