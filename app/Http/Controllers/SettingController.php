<?php

namespace App\Http\Controllers;

use App\Models\Limitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class SettingController extends Controller
{
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Limitation $limitation)
    {
        $limitation = Limitation::find(1);
        return inertia("Admin/Settings/SettingEdit", [
            "limitation" => $limitation
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Limitation $limitation)
    {
        $data = $request->validate([
            "book_limit" => "required",
            "day_limit" => "required"
        ]);
        Limitation::find(1)->update($data);

        return Redirect::to(route("setting.edit"))->with("success", "Pengaturan berhasil diperbarui.");
    }
}
