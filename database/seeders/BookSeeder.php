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
            "image" => "images/books/sejarah_dunia_yang_disembunyikan.png",
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

        $book1->categories()->sync([8]);
        $book1->authors()->sync([2]);

        $book2 = Book::create([
            "image" => "images/books/filosofi_teras.jpg",
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

        $book2->categories()->sync([1]);
        $book2->authors()->sync([1]);

        $book3 = Book::create([
            "image" => "images/books/the_360_leader.jpg",
            "isbn" => "9786230405891",
            "title" => "The 360 Degree Leader",
            "publisher_id" => 3,
            "publish_year" => "2021",
            "pages" => "420",
            "language" => "Bahasa Indonesia",
            "description" => "Anda tidak harus terjebak dalam keadaan maupun posisi Anda. Anda tidak harus menjadi CEO untuk dapat memimpin secara efektif. Anda pun dapat belajar memengaruhi melalui kepemimpinan Anda meskipun Anda merupakan bawahan langsung dari seseorang yang bukan seorang pemimpin yang baik. Apa rahasianya? Anda belajar untuk mengembangkan pengaruh Anda dari mana pun di organisasi Anda dengan menjadi seorang Pemimpin 360 Derajat. Anda belajar untuk memimpin ke atas, memimpin ke samping, memimpin ke bawah.",
            "remaining_stock" => "1",
            "stock" => "1",
            "status" => true,
        ]);

        $book3->categories()->sync([11]);
        $book3->authors()->sync([3]);

        $book4 = Book::create([
            "image" => "images/books/design_create_innovate_your_future.png",
            "isbn" => "9786020673646",
            "title" => "Design Create Innovate Your Future",
            "publisher_id" => 4,
            "publish_year" => "2024",
            "pages" => "22",
            "language" => "Bahasa Indonesia",
            "description" => "Dunia telah bertransformasi. Perkembangan teknologi, kecerdasan buatan, pandemi COVID-19, hingga kondisi geopolitik memicu perubahan itu. Akibatnya, arah bisnis makin tidak menentu. Banyak pekerjaan diambil alih oleh teknologi. Pengetahuan dan skill yang kita kuasai saat ini bisa jadi tak relevan lagi beberapa tahun mendatang. Ketidakpastian makin mengusik. Masa depan kian tak bisa diprediksi. Dalam keadaan yang serba tidak pasti dan tidak diketahui, satu-satunya jalan untuk menjadi tangguh dan bijaksana adalah menciptakan masa depan kita sendiri. Design Create Innovate Your Future membantu Anda untuk memahami era ketidakpastian dan mampu melewatinya. Tidak hanya itu, Anda juga akan mampu mengubah krisis atau masalah-masalah yang kompleks menjadi solusi dan terobosan yang inovatif dan berdampak positif. Tidak hanya berisikan teori, buku ini juga memuat cara-cara praktis untuk survive and thrive. Jika saat ini Anda sedang berada dalam kebingungan dan ingin menciptakan masa depan sendiri, buku ini untuk Anda.",
            "remaining_stock" => "4",
            "stock" => "4",
            "status" => true,
        ]);

        $book4->categories()->sync([12]);
        $book4->authors()->sync([4, 5]);
    }
}
