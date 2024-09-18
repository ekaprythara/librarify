<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\Returning;
use App\Models\User;
use Illuminate\Http\Request;

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
        $users = User::whereHas("loans")->get();
        $loans = Loan::with(["users", "books"])->get();

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

        dd($request->all());
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
