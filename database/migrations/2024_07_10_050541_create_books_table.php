<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string("image")->nullable();
            $table->string('isbn');
            $table->string('title');
            $table->foreignId("publisher_id")->constrained("publishers", "id");
            $table->string("publish_year");
            $table->string("pages");
            $table->string("language");
            $table->text("description");
            $table->string("remaining_stock");
            $table->string("stock");
            $table->boolean("status");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
