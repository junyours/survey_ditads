<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rules\Password;

class ProfileController extends Controller
{
    public function information()
    {
        return Inertia::render('Profile/Information');
    }

    public function changePassword(Request $request)
    {
        $user_id = auth()->user()->id;

        $user = User::find($user_id);

        if ($user->is_default === 0) {
            $request->validate([
                'password' => ['required', Password::defaults(), 'confirmed'],
            ]);

            $user->update([
                'password' => Hash::make($request->password),
                'is_default' => 1
            ]);
        } else {
            $request->validate([
                'current_password' => ['required', 'current_password'],
                'password' => ['required', Password::defaults(), 'confirmed'],
            ]);

            $user->update([
                'password' => Hash::make($request->password),
            ]);
        }
    }
}
