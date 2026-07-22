<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Notifications\RegistrationOtpNotification;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Notification;
use Illuminate\Notifications\AnonymousNotifiable;
use Illuminate\Support\Str;
class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255|unique:users,name',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6|confirmed',
                'profile_picture' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
            ],
            [
                'name.unique' => 'This username is already taken.',
                'email.unique' => 'An account with this email already exists.',
            ]
        ); 
        if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors()->first(),
                ], 422);
        }
        $image_path="images/default-avatar.png";
        if($request->hasFile('profile_picture')){
            $image_path=$request->file('profile_picture')->store('profile_picture','public');
        }
        $otp = (string) random_int(100000, 999999);
        Cache::put('registration_pending_' . $request->email, [
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'profile_picture' => $image_path,
        ], now()->addMinutes(10));
        Cache::put('registration_otp_' . $request->email, $otp, now()->addMinutes(10));
        Notification::route('mail', $request->email)
            ->notify(new RegistrationOtpNotification($otp));

        return response()->json([
            'message' => 'Verification code sent to your email.',
            'email' => $request->email,
        ], 200);
    }
    public function verifyOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'otp' => 'required|digits:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
            ], 422);
        }

        $cachedOtp = Cache::get('registration_otp_' . $request->email);
        $pendingData = Cache::get('registration_pending_' . $request->email);

        if (!$cachedOtp || !$pendingData) {
            return response()->json([
                'message' => 'Verification session expired. Please register again.',
            ], 410);
        }
        if ($cachedOtp !== $request->otp) {
            return response()->json([
                'message' => 'Invalid verification code.',
                'otp'=>$cachedOtp,
            ], 401);
        }

        $user = User::create([
            'name' => $pendingData['name'],
            'email' => $pendingData['email'],
            'password' => $pendingData['password'], 
            'profile_picture' => $pendingData['profile_picture'],
            'email_verified_at' => now(), 
        ]);

        Cache::forget('registration_otp_' . $request->email);
        Cache::forget('registration_pending_' . $request->email);
        return response()->json([
            'message' => 'Email verified and account created successfully.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'profile_picture' => asset(
                    $user->profile_picture == "images/default-avatar.png"
                        ? $user->profile_picture
                        : "storage/" . $user->profile_picture
                ),
            ]
        ], 201);
    }
    public function resendOtp(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $pendingData = Cache::get('registration_pending_' . $request->email);

        if (!$pendingData) {
            return response()->json([
                'message' => 'No pending registration found. Please start again.',
            ], 404);
        }

        $otp = (string) random_int(100000, 999999);
        Cache::put('registration_otp_' . $request->email, $otp, now()->addMinutes(10));

        Notification::route('mail', $request->email)
            ->notify(new RegistrationOtpNotification($otp));

        return response()->json(['message' => 'A new code has been sent.'], 200);
    }
    public function forgotPassword(Request $request){
        $request->validate(['email'=>'required|email']);
        $user =User::where('email',$request->email)->first();
        if(!$user){
            return response()->json(['message'=>"Email doesnot exist"],404);
        }
        $otp = (string) random_int(100000, 999999);
        Cache::put('password_reset_otp_'.$request->email,$otp,now()->addMinutes(10));
        Notification::route('mail',$request->email)
            ->notify(new RegistrationOtpNotification($otp));
        return response()->json([
            'message'=>'Otp Sent',
            'email'=>$request->email,
        ],200);
    }
    public function verifyForgotPasswordOtp(Request $request)
    {
        $request->validate([
            'email'=>'required|email',
            'otp'=>'required|digits:6'
        ]);

        $cachedOtp = Cache::get(
            'password_reset_otp_'.$request->email
        );

        if(!$cachedOtp){
            return response()->json([
                'message'=>'OTP expired.'
            ],410);
        }

        if($cachedOtp != $request->otp){
            return response()->json([
                'message'=>'Invalid OTP.'
            ],401);
        }

        Cache::put(
            'password_reset_verified_'.$request->email,
            true,
            now()->addMinutes(10)
        );
        \Log::info('SET verified key: ' . 'password_reset_verified_'.$request->email);
        Cache::forget(
            'password_reset_otp_'.$request->email
        );

        return response()->json([
            'message'=>'OTP verified.'
        ]);
    }
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email'=>'required|email',
            'password'=>'required|confirmed|min:6'
        ]);
        \Log::info('GET verified key: ' . 'password_reset_verified_'.$request->email);
        \Log::info('Cache value: ' . json_encode(Cache::get('password_reset_verified_'.$request->email)));
        if(!Cache::get('password_reset_verified_'.$request->email)){
            return response()->json([
                'message'=>'OTP verification required.'
            ],403);
        }

        $user = User::where('email',$request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        $user->password = Hash::make($request->password);

        $user->save();

        Cache::forget(
            'password_reset_verified_'.$request->email
        );

        return response()->json([
            'message'=>'Password changed successfully.'
        ]);
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email'=>'required|email',
            'password'=>'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Validation Error',
                'errors'=>$validator->errors()
            ],422);
        }

        $user = User::where('email',$request->email)->first();

        if(!$user){
            return response()->json([
                'message'=>'Email does not exist'
            ],404);
        }

        if(!Hash::check($request->password,$user->password)){
            return response()->json([
                'message'=>'Incorrect Password'
            ],401);
        }

        Auth::login($user);

        $request->session()->regenerate();

        return response()->json([
            'message'=>'Login Successful',
            'user'=>[
                'id'=>$user->id,
                'name'=>$user->name,
                'email'=>$user->email,
                'profile_picture'=>asset(
                    $user->profile_picture == "images/default-avatar.png"
                        ? $user->profile_picture
                        : "storage/".$user->profile_picture
                )
            ]
        ],200);
    }
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()
            ->json([
                'message' => 'Logged out'
            ])
            ->withoutCookie('laravel_session')
            ->withoutCookie('XSRF-TOKEN');
    }
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}