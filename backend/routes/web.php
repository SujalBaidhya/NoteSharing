<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
Route::get('/', function () {
    return view('welcome');
});
Route::post('/register', [AuthController::class,'register']);
Route::post('/login', [AuthController::class,'login']);
Route::post('/logout', [AuthController::class,'logout']);
Route::middleware('auth')->get('/user', function (Request $request) {
    return response()->json([
        'id' => $request->user()->id,
        'name' => $request->user()->name,
        'email' => $request->user()->email,
        'profile_picture' => asset(
            $request->user()->profile_picture == "images/default-avatar.png"
                ? $request->user()->profile_picture
                : "storage/".$request->user()->profile_picture
        )
    ]);
});
Route::get('/notes/my-notes', [NoteController::class,'myNotes']);
Route::delete('/notes/{note}', [NoteController::class,'destroy']);
Route::post('/notes/{note}', [NoteController::class, 'update']);
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});
Route::post('/register/send-otp', [AuthController::class, 'sendOtp']);
Route::post('/register/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/register/resend-otp', [AuthController::class, 'resendOtp']);
Route::post('/forgot-password/send-otp', [AuthController::class, 'sendOtp']);
Route::post('/forgot-password/verify-otp', [AuthController::class, 'verifyForgotPasswordOtp']);
Route::post('/forgot-password/otp',[AuthController::class,'forgotPassword']);
Route::post('/resetpassword',[AuthController::class,'resetPassword']);
Route::post('/forgot-password/resend-otp', [AuthController::class, 'resendForgotPasswordOtp']);
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/users', [AdminController::class, 'users']);
    Route::get('/admin/notes', [AdminController::class, 'notes']);
    Route::delete('/admin/notes/{id}', [AdminController::class, 'deleteNote']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'destroy']);
    Route::get('/admin/users/{id}/notes', [AdminController::class, 'userNotes']);
});