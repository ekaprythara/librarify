<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return inertia("Admin/Category", [
            "categories" => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Admin/CategoryCreate");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "name" => ["required", "regex:/^[a-zA-Z\s]+$/", "min:2", "max:50"],
        ]);

        Category::create($data);

        return Redirect::to(route("category.index"))->with("success", "Kategori baru berhasil ditambah.");
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category, $id)
    {
        $category = Category::find($id);

        return inertia("Admin/CategoryEdit", [
            "category" => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category, $id)
    {
        $data = $request->validate([
            "name" => ["required", "regex:/^[a-zA-Z\s]+$/", "min:2", "max:50"],
        ]);

        Category::find($id)->update($data);

        return Redirect::to(route("category.index"))->with("success", "Kategori baru berhasil diubah.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
