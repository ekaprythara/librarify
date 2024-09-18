<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $book1 = Book::create([
            "image" => "images/books/sejarah-dunia-yang-disembunyikan.jpg",
            "isbn" => "9786029193671",
            "title" => "Sejarah Dunia yang Disembunyikan",
            "publisher_id" => 2,
            "publish_year" => "2015",
            "pages" => "636",
            "language" => "Bahasa Indonesia",
            "description" => "Banyak orang mengatakan bahwa sejarah ditulis oleh para pemenang. Hal ini sama sekali tak mengejutkan alias wajar belaka. Tetapi, bagaimana jika sejarah—atau apa yang kita ketahui sebagai sejarah—ditulis oleh orang yang salah? Bagaimana jika semua yang telah kita ketahui hanyalah bagian dari cerita yang salah tersebut? Dalam buku kontroversial yang sangat tersohor ini, Jonathan Black mengupas secara tajam penelusurannya yang brilian tentang misteri sejarah dunia. Dari mitologi Yunani dan Mesir kuno sampai cerita rakyat Yahudi, dari kultus Kristiani sampai Freemason, dari Karel Agung sampai Don Quixote, dari George Washington sampai Hitler, dan dari pewahyuan Muhammad hingga legenda Seribu Satu Malam, Jonathan menunjukkan bahwa pengetahuan sejarah yang terlanjur mapan perlu dipikirkan kembali secara revolusioner. Dengan pengetahuan alternatif ihwal sejarah dunia selama lebih dari 3.000 tahun, dia mengungkap banyak rahasia besar yang selama ini disembunyikan. Buku ini akan membuat Anda mempertanyakan kembali segala sesuatu yang telah diajarkan kepada Anda. Dan, berbagai pengetahuan baru yang diungkapkan sang penulis benar-benar akan membuka dan mencerahkan wawasan Anda.",
            "remaining_stock" => "2",
            "stock" => "2",
            "status" => true,
        ]);

        $categoryIds1 = [8];
        $authorIds1 = [2];

        $book1->categories()->sync($categoryIds1);
        $book1->authors()->sync($authorIds1);

        $book2 = Book::create([
            "image" => "images/books/filosofi-teras.jpeg",
            "isbn" => "9786233463034",
            "title" => "Filosofi Teras",
            "publisher_id" => 1,
            "publish_year" => "2022",
            "pages" => "298",
            "language" => "Bahasa Indonesia",
            "description" => "Lebih dari 2.000 tahun lalu, sebuah mazhab filsafat menemukan akar masalah dan juga solusi dari banyak emosi negatif. Stoisisme, atau Filosofi Teras, adalah filsafat Yunani-Romawi kuno yang bisa membantu kita mengatasi emosi negatif dan menghasilkan mental yang tangguh dalam menghadapi naik-turunnya kehidupan. Jauh dari kesan filsafat sebagai topik berat dan mengawang-awang, Filosofi Teras justru bersifat praktis dan relevan dengan kehidupan Generasi Milenial dan Gen-Z masa kini.",
            "remaining_stock" => "2",
            "stock" => "2",
            "status" => true,
        ]);

        $categoryIds2 = [1];
        $authorIds2 = [1];

        $book2->categories()->sync($categoryIds2);
        $book2->authors()->sync($authorIds2);
    }
}
