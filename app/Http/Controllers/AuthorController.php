<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $authors = Author::all();
        return inertia("Admin/Author", [
            "authors" => $authors
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Admin/AuthorCreate");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "name" => ["required", "regex:/^[a-zA-Z\s]+$/", "min:2", "max:50"],
        ]);

        Author::create($data);

        return Redirect::to(route("author.index"))->with("success", "Data pengarang berhasil ditambah.");
    }

    /**
     * Display the specified resource.
     */
    public function show(Author $author)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Author $author, $id)
    {
        $author = Author::find($id);

        return inertia("Admin/AuthorEdit", [
            "author" => $author
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Author $author, $id)
    {
        $data = $request->validate([
            "name" => ["required", "regex:/^[a-zA-Z\s]+$/", "min:2", "max:50"],
        ]);

        Author::find($id)->update($data);

        return Redirect::to(route("author.index"))->with("success", "Data pengarang berhasil diubah.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Author $author)
    {
        //
    }
}
