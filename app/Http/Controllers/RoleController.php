<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::where("id", "2")->get();

        return inertia("Admin/Role", [
            "roles" => $roles
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role, $id)
    {
        $roles = Role::find($id);

        return inertia("Admin/RoleEdit", [
            "roles" => $roles
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): RedirectResponse
    {
        $validated = $request->validate([
            "book_limit" => "required|integer|min:1|max:5",
            "day_limit" => "required|integer|min:1|max:14"
        ]);

        Role::where("id", $id)->update($validated);

        return Redirect::to("/role")->with("message", "Data berhasil diedit.");
    }
}
