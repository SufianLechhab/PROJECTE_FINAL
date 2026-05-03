<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ViatgeController;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\ActivitatController;
use Illuminate\Support\Facades\Route;

// ---------------- AUTH ----------------
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// ---------------- RUTES PROTEGIDES ----------------
Route::middleware('auth:sanctum')->group(function () {

    // AUTH
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);


    // VIATGES
    Route::get('/viatges', [ViatgeController::class, 'index']);
    Route::get('/viatges/{id}', [ViatgeController::class, 'show']);
    Route::post('/viatges', [ViatgeController::class, 'store']);
    Route::put('/viatges/{id}', [ViatgeController::class, 'update']);
    Route::delete('/viatges/{id}', [ViatgeController::class, 'destroy']);


    // PARTICIPANTS
    Route::post('/viatges/{id}/participants', [ParticipantController::class, 'store']);


    // ACTIVITATS (CRUD COMPLET)
    Route::get('/viatges/{id}/activitats', [ActivitatController::class, 'index']);
    Route::post('/viatges/{id}/activitats', [ActivitatController::class, 'store']);
    Route::put('/activitats/{id}', [ActivitatController::class, 'update']);
    Route::delete('/activitats/{id}', [ActivitatController::class, 'destroy']);

    //APUNTACIÓ
    
    Route::post('/activitats/{id}/apuntar', [ActivitatController::class, 'apuntar']);
Route::post('/activitats/{id}/desapuntar', [ActivitatController::class, 'desapuntar']);

});