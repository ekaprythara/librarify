<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $guarded = ["id"];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'book_category')->withTimestamps();
    }

    public function authors()
    {
        return $this->belongsToMany(Author::class, 'book_author')->withTimestamps();
    }

    public function publishers()
    {
        return $this->belongsTo(Publisher::class, "publisher_id");
    }

    public function loans()
    {
        return $this->hasMany(Loan::class, "book_id");
    }
}
