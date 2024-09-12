<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $members = User::with("role")->where("role_id", "2")->latest()->get();
        return inertia("Admin/Member", [
            "members" => $members,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Admin/MemberCreate");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->hasFile('image')) {
            // Store the uploaded file and get the path
            $path = $request->file('image')->store('images/users', 'public');
        } else {
            $path = null;
        }

        $data = $request->validate([
            "image" => "nullable|image|mimes:jpg,jpeg,png|max:2048",
            "username" => "required",
            "password" => ['required', 'confirmed', Rules\Password::defaults()],
            "name" => "required",
            "address" => "required",
            "phone_number" => "required",
            "email" => "required",
        ]);

        $data["username"] = strtolower($data["username"]);
        $data["image"] = $path;
        $data["role_id"] = 2;
        $data["password"] = bcrypt($data["password"]);

        User::create($data);
        return Redirect::to(route("member.index"))->with("message", "Data anggota berhasil ditambah.");
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
