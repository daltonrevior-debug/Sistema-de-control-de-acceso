<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::all();

        return Inertia::render('users/Index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        return Inertia::render('users/Create');
    }

    public function edit(User $user)
    {
        return Inertia::render('users/Edit', [
            'user' => $user
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'         => 'required|string|max:255',
            'email'        => 'required|string|lowercase|email|max:255|unique:users,email',
            'password'     => ['required', 'confirmed', Rules\Password::defaults()],
            'role'         => 'required|string|in:admin,super_admin',
            'permission.*' => 'string',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'permission' => $request->permission,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('users.index')
            ->with('message', 'Usuario creado exitosamente.');
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name'       => 'required|string|max:255',
            'email'      => 'required|email|max:255|unique:users,email,' . $user->id,
            'role'       => 'required|string|in:admin,super_admin',
            'permission' => 'nullable|array',
            'password'   => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        $data = [
            'name'       => $request->name,
            'email'      => $request->email,
            'role'       => $request->role,
            'permission' => $request->permission,
        ];

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return redirect()->route('users.index')->with('message', 'Usuario actualizado correctamente.');
    }

    public function destroy(User $user)
    {
        $currentUser = Auth::user();

        if ($currentUser->id === $user->id) {
            return redirect()->back()->with('error', 'No puedes eliminar tu propia cuenta.');
        }

        if ($user->role === 'admin' && $currentUser->role !== 'super_admin') {
            return redirect()->back()->with('error', 'No tienes permisos suficientes para eliminar a otro administrador.');
        }

        if ($user->role === 'super_admin' && $currentUser->role !== 'super_admin') {
            return redirect()->back()->with('error', 'No se puede eliminar a un Super Administrador.');
        }

        $user->delete();

        return redirect()->route('users.index')->with('message', 'Usuario eliminado correctamente.');
    }
}
