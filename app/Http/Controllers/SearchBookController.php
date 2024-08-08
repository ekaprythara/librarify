<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class SearchBookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::with(['categories', "publishers", "authors"])->get();
        return inertia("SearchBook", [
            "books" => $books,
        ]);
    }
}
