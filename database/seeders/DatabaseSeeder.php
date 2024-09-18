<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Author;
use App\Models\Book;
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
        Limitation::create([]);

        Role::create([
            "name" => "Admin",
        ]);

        Role::create([
            "name" => "Member",
        ]);

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

        User::create([
            "username" => "amanda",
            "password" => "password",
            "name" => "Amanda",
            "address" => "Jalan Hang Tuah",
            "phone_number" => "085175088590",
            "email" => "amanda@gmail.com",
            "role_id" => 2
        ]);

        Category::create([
            "name" => "Filsafat",
        ]);
        Category::create([
            "name" => "Fiksi",
        ]);
        Category::create([
            "name" => "Fiksi Ilmiah",
        ]);
        Category::create([
            "name" => "Aksi & Petualangan",
        ]);
        Category::create([
            "name" => "Misteri",
        ]);
        Category::create([
            "name" => "Biografi",
        ]);
        Category::create([
            "name" => "Seni & Fotografi",
        ]);
        Category::create([
            "name" => "Sejarah",
        ]);
        Category::create([
            "name" => "Religi & Spiritual",
        ]);
        Category::create([
            "name" => "Sains & Teknologi",
        ]);

        Author::create([
            "name" => "Henry Manampiring",
        ]);
        Author::create([
            "name" => "Jonathan Black",
        ]);

        Publisher::create([
            "name" => "Penerbit Buku Kompas",
        ]);
        Publisher::create([
            "name" => "Pustaka Alvabet",
        ]);
    }
}
