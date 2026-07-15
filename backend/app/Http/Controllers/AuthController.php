<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
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
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'profile_picture'=>$image_path,
            'password' => $request->password,
        ]);

        return response()->json([
            'message' => 'User Registered Successfully',
            'user' =>[
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