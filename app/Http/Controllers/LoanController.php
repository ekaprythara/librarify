<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Limitation;
use App\Models\Loan;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use PhpParser\Node\Stmt\Foreach_;
use Illuminate\Support\Carbon;


class LoanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $loans = Loan::with(["users", "books"])->latest()->get();
        return inertia("Admin/Transaction/Loan", [
            "loans" => $loans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // ->where("remaining_stock", ">", "0")
        $loans = Loan::with(["users.loans.books"])->where("status", "dipinjam")->get();
        $books = Book::with(['authors'])->where("remaining_stock", ">", "0")->where("status", true)->get();
        $users = User::where("role_id", "2")->get();
        return inertia("Admin/Transaction/LoanCreate", [
            "books" => $books,
            "users" => $users,
            "loans" => $loans
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request to ensure 'book_id' is an array of integers
        $request->validate([
            "user_id" => "required|integer",
            "book_id" => "required|array",
            "book_id.*" => "required|integer",
        ]);

        // Retrieve the first data of day_limit and book_limit
        $dayLimit = Limitation::pluck("day_limit")->first();
        $bookLimit = Limitation::pluck("book_limit")->first();

        // Retrieve user with loan count
        $bookLoanedByUserCount = Loan::where("status", "dipinjam")->where('user_id', $request->user_id)->count();

        $loanDate = Carbon::now();
        $dueDate = Carbon::now()->addDays($dayLimit);

        $userName = User::where('id', $request->user_id)->pluck('name')->first();

        try {
            // Start a database transaction
            DB::beginTransaction();

            // Check if the number of books already loaned is less than the limit
            if ($bookLoanedByUserCount < $bookLimit) {
                // Iterate through each book ID provided in the request
                foreach ($request->book_id as $bookId) {
                    // Check if the book is already loaned by the user
                    $alreadyLoaned = Loan::where("status", "dipinjam")
                        ->where("user_id", $request->user_id)
                        ->where("book_id", $bookId)
                        ->exists();

                    // Check if the book has stock available
                    $isNotAvailable = Book::where('id', $bookId)
                        ->where('remaining_stock', '<=', 0)
                        ->where("status", true)
                        ->exists();

                    if ($alreadyLoaned || $isNotAvailable) {
                        // If the book is already loaned by the user, roll back and return an error message
                        DB::rollBack();
                        return redirect("/peminjaman")
                            ->with("error", "Buku tidak tersedia atau sedang dipinjam oleh pengguna ini.");
                    }

                    // Prepare data for creating a new loan entry
                    $data = [
                        "user_id" => $request->user_id,
                        "book_id" => $bookId,
                        "loan_date" => $loanDate->format("Y-m-d"),
                        "due_date" => $dueDate->format("Y-m-d"),
                    ];

                    // Decrement the remaining stock of the book
                    Book::where("id", $bookId)->decrement("remaining_stock");

                    // Create a new loan entry in the database
                    Loan::create($data);
                }

                // Commit the transaction if all operations are successful
                DB::commit();

                // Redirect to the list of loans with a success message
                return redirect("/peminjaman")
                    ->with("success", "$userName berhasil meminjam buku.");
            } else {
                DB::rollBack();
                return redirect("/peminjaman")
                    ->with("error", "Tidak dapat meminjam buku karena $userName telah melebihi batas peminjaman.");
            }
        } catch (\Exception $e) {
            // Rollback the transaction if an exception occurs
            DB::rollBack();
            return redirect("/peminjaman/create")
                ->with("message", "Error: " . $e->getMessage());
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Loan $loan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Loan $loan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Loan $loan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Loan $loan)
    {
        //
    }
}
