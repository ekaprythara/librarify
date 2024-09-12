<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use Illuminate\Support\Facades\Redirect;
use App\Models\Category;
use App\Models\Publisher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::with(['categories', "publishers", "authors"])->latest()->paginate(20);
        return inertia("Admin/Book", [
            "books" => $books,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        $authors = Author::all();
        $publishers = Publisher::all();

        return inertia("Admin/BookCreate", [
            "categories" => $categories,
            "authors" => $authors,
            "publishers" => $publishers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            "image" => "nullable|image|file|max:2048|mimes:jpeg,png,jpg",
            "isbn" => "required",
            "title" => "required",
            "category_id" => "required|array",
            "category_id.*" => "exists:categories,id",
            "author_id" => "required|array",
            "author_id.*" => "exists:authors,id",
            "publisher_id" => "required",
            "publish_year" => "required",
            "pages" => "required",
            "language" => "required",
            "description" => "required",
            "remaining_stock" => "required",
            "status" => "required"
        ]);


        // Check if a file was uploaded
        if ($request->hasFile('image')) {
            // Store the uploaded file and get the path
            $path = $request->file('image')->store('images/books', 'public');

            $book = Book::create([
                "image" => $path,
                "isbn" => $validated["isbn"],
                "title" => $validated["title"],
                "publisher_id" => $validated["publisher_id"],
                "publish_year" => $validated["publish_year"],
                "pages" => $validated["pages"],
                "language" => $validated["language"],
                "description" => $validated["description"],
                "remaining_stock" => $validated["remaining_stock"],
                "stock" => $validated["remaining_stock"],
                "status" => $validated["status"]
            ]);

            $book->categories()->sync($validated["category_id"]);
            $book->authors()->sync($validated["author_id"]);

            return Redirect::to('/buku');
        } else {
            $book = Book::create([
                "isbn" => $validated["isbn"],
                "title" => $validated["title"],
                "publisher_id" => $validated["publisher_id"],
                "publish_year" => $validated["publish_year"],
                "pages" => $validated["pages"],
                "language" => $validated["language"],
                "description" => $validated["description"],
                "remaining_stock" => $validated["remaining_stock"],
                "stock" => $validated["remaining_stock"],
                "status" => $validated["status"]
            ]);

            $book->categories()->sync($validated["category_id"]);
            $book->authors()->sync($validated["author_id"]);

            return Redirect::to('/buku');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Retrieve the book with categories
        $book = Book::with(['categories', "publishers", "authors"])->find($id);

        return inertia("Admin/BookDetail", [
            "book" => $book, // Return a single book, not an array
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        // Retrieve the book with categories
        $book = Book::with(['categories', "publishers", "authors"])->find($id);

        $categories = Category::all();
        $authors = Author::all();
        $publishers = Publisher::all();

        return inertia("Admin/BookEdit", [
            "book" => $book, // Return a single book, not an array
            "categories" => $categories,
            "authors" => $authors,
            "publishers" => $publishers
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): RedirectResponse
    {
        // Retrieve the Book instance
        $book = Book::findOrFail($id);

        if ($request->hasFile('image')) {
            // Store the uploaded file and get the path
            $path = $request->file('image')->store('images/books', 'public');

            // Validate the incoming request data
            $validated = $request->validate([
                "image" => "image|file|max:2048|mimes:jpeg,png,jpg",
                "isbn" => "required",
                "title" => "required",
                "category_id" => "required|array",
                "category_id.*" => "exists:categories,id",
                "author_id" => "required|array",
                "author_id.*" => "exists:authors,id",
                "publisher_id" => "required",
                "publish_year" => "required",
                "pages" => "required",
                "language" => "required",
                "description" => "required",
                "remaining_stock" => "required",
                "status" => "required"
            ]);

            // Delete old image when the new image stored
            $oldImage = Book::where("id", $id)->value("image");
            Storage::delete(strval($oldImage));

            // Update the Book instance
            $book->update([
                "image" => $path,
                "isbn" => $validated["isbn"],
                "title" => $validated["title"],
                "publisher_id" => $validated["publisher_id"],
                "publish_year" => $validated["publish_year"],
                "pages" => $validated["pages"],
                "language" => $validated["language"],
                "description" => $validated["description"],
                "remaining_stock" => $validated["remaining_stock"],
                "stock" => $validated["remaining_stock"],
                "status" => $validated["status"],
            ]);

            // Synchronize the categories and authors
            $book->categories()->sync($validated["category_id"]);
            $book->authors()->sync($validated["author_id"]);

            return Redirect::to("/buku/$id");
        } else {
            // Validate the incoming request data
            $validated = $request->validate([
                "isbn" => "required",
                "title" => "required",
                "category_id" => "required|array",
                "category_id.*" => "exists:categories,id",
                "author_id" => "required|array",
                "author_id.*" => "exists:authors,id",
                "publisher_id" => "required",
                "publish_year" => "required",
                "pages" => "required",
                "language" => "required",
                "description" => "required",
                "remaining_stock" => "required",
                "status" => "required"
            ]);

            // Update the Book instance
            $book->update([
                "isbn" => $validated["isbn"],
                "title" => $validated["title"],
                "publisher_id" => $validated["publisher_id"],
                "publish_year" => $validated["publish_year"],
                "pages" => $validated["pages"],
                "language" => $validated["language"],
                "description" => $validated["description"],
                "remaining_stock" => $validated["remaining_stock"],
                "stock" => $validated["remaining_stock"],
                "status" => $validated["status"],
            ]);

            // Synchronize the categories and authors
            $book->categories()->sync($validated["category_id"]);
            $book->authors()->sync($validated["author_id"]);

            return Redirect::to("/buku/$id");
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book): RedirectResponse
    {
        // Delete image when the book is deleted
        if ($book->image) {
            $oldImage = Book::where("id", $book->id)->value("image");
            Storage::delete(strval($oldImage));
        }

        $book->delete();
        return Redirect::to('/buku');
    }
}
