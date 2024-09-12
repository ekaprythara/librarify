<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Author;
use App\Models\Category;
use App\Models\Limitation;
use App\Models\Publisher;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Role::create([
            "name" => "Admin",
        ]);

        Role::create([
            "name" => "Member",
        ]);

        Limitation::create([]);

        User::create([
            "image" => "images/users/profile.jpg",
            "username" => "ekapriyanthara",
            "password" => "password",
            "name" => "Eka Priyanthara",
            "address" => "Jalan Nangka",
            "phone_number" => "085175088570",
            "email" => "ekapriyanthara@gmail.com",
            "role_id" => 1
        ]);

        User::create([
            "username" => "sanguin",
            "password" => "password",
            "name" => "Sanguin",
            "address" => "Jalan Merdeka",
            "phone_number" => "085175088580",
            "email" => "sanguin@gmail.com",
            "role_id" => 2
        ]);

        Category::create([
            "name" => "Filsafat",
        ]);
        Category::create([
            "name" => "Fiksi",
        ]);
        Category::create([
            "name" => "Sains",
        ]);

        Author::create([
            "name" => "Henry Manampiring",
        ]);
        Author::create([
            "name" => "Sanguin",
        ]);
        Author::create([
            "name" => "James Paul",
        ]);

        Publisher::create([
            "name" => "PT. Kompas Media Nusantara",
        ]);
    }
}
