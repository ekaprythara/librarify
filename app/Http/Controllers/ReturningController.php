<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Loan;
use App\Models\Returning;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReturningController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $returnings = Returning::with(["loans", "loans.books", "loans.users"])->get();
        return inertia("Admin/Transaction/Returning", [
            "returnings" => $returnings
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::whereHas('loans', function ($query) {
            $query->where('status', 'dipinjam');
        })->get();
        $loans = Loan::with(["users", "books"])->where("status", "dipinjam")->get();

        return inertia("Admin/Transaction/ReturningCreate", [
            "loans" => $loans,
            "users" => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request to ensure 'loan_id' is an array of integers
        $request->validate([
            "loan_id" => "required|array",
            "loan_id.*" => "required|integer",
        ]);

        $returnDate = Carbon::now();

        try {
            DB::beginTransaction();

            foreach ($request->loan_id as $loanId) {
                $data = [
                    "loan_id" => $loanId,
                    "return_date" => $returnDate->format("Y-m-d"),
                    "isLost" => false,
                ];

                $_bookId = Loan::where("id", $loanId)->value("book_id");
                Book::where("id", $_bookId)->increment("remaining_stock");

                Loan::where("id", $loanId)->update(["status" => "dikembalikan"]);

                Returning::create($data);
            }

            DB::commit();

            return redirect("/pengembalian")
                ->with("success", "Berhasil mengembalikan buku.");
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect("/pengembalian/create")
                ->with("message", "Error: " . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Returning $returning)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Returning $returning)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Returning $returning)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Returning $returning)
    {
        //
    }
}
