<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublisherController;
use App\Http\Controllers\ReturningController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SearchBookController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/', [GuestController::class, "index"]);
Route::post('/', [GuestController::class, "store"]);

// Search Books
Route::get("/cari-buku", [SearchBookController::class, "index"])->name("search-book");

Route::get("/buku", [BookController::class, "index"])->name("book");


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->group(function () {
    // Member Routes
    Route::get("/role", [RoleController::class, "index"])->name("role");
    Route::get("/role/{id}/edit", [RoleController::class, "edit"])->name("role.edit");
    Route::patch("/role/{id}/edit", [RoleController::class, "update"]);


    // Member Routes
    Route::get("/anggota", [UserController::class, "index"])->name("member.index");
    Route::get("/anggota/create", [UserController::class, "create"])->name("member.create");
    Route::post("/anggota/create", [UserController::class, "store"]);

    // Book Routes
    Route::get("/buku/create", [BookController::class, "create"])->name("book.create"); // Halaman Form Store
    Route::post("/buku/create", [BookController::class, "store"]); // Logika Store
    Route::get("/buku/{id}/edit", [BookController::class, "edit"])->name("book.edit");
    Route::patch("/buku/{id}/edit", [BookController::class, "update"]);
    Route::delete("/buku/{book}/delete", [BookController::class, "destroy"]);

    // Category Routes
    Route::get("/kategori", [CategoryController::class, "index"])->name("category");
    Route::post("/kategori", [CategoryController::class, "store"]);

    // Author Routes
    Route::get("/pengarang", [AuthorController::class, "index"])->name("author");
    Route::post("/pengarang", [AuthorController::class, "store"]);

    // Publisher Routes
    Route::get("/penerbit", [PublisherController::class, "index"])->name("publisher");
    Route::post("/penerbit", [PublisherController::class, "store"]);

    // Transaksi
    Route::get("/peminjaman", [LoanController::class, "index"])->name("loan.index");
    Route::get("/peminjaman/create", [LoanController::class, "create"])->name("loan.create");
    Route::post("/peminjaman/create", [LoanController::class, "store"]);

    Route::get("/pengembalian", [ReturningController::class, "index"])->name("returning.index");
});

Route::get("/buku/{id}", [BookController::class, "show"])->name("book.show");

require __DIR__ . '/auth.php';
