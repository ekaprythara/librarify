<?php

namespace App\Http\Controllers;

use App\Models\Book;
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
        $loans = Loan::with(["users", "books"])->get();
        return inertia("Admin/Transaction/Loan", [
            "loans" => $loans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $books = Book::where("remaining_stock", ">", "0")->where("status", true)->get();
        $users = User::where("role_id", "2")->get();
        return inertia("Admin/Transaction/LoanCreate", [
            "books" => $books,
            "users" => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        // Validate incoming request to ensure 'book_id' is an array of integers
        $request->validate([
            "book_id" => "required|array",
            "book_id.*" => "required|integer",
        ]);

        // Retrieve the day limit for the role with ID 2 from the database
        $dayLimit = Role::where("id", "2")->value("day_limit");

        // Set the current date and calculate the due date by adding the day limit
        $loanDate = Carbon::now();
        $dueDate = Carbon::now()->addDays($dayLimit);

        try {
            // Start a database transaction
            DB::beginTransaction();

            // Iterate through each book ID provided in the request
            foreach ($request->book_id as $bookId) {
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
                ->with("message", "Data berhasil disimpan.");
        } catch (\Exception $e) {
            // Rollback the transaction if an exception occurs
            DB::rollBack();

            // Redirect to the loan creation page with an error message
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
