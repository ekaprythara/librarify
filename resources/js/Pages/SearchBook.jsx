// import { books } from "@/constants/books";
import Guest from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import filosofiTerasImg from "../../../public/images/books/filosofi_teras.jpg";

export default function SearchBook({ books }) {
    return (
        <Guest>
            <Head title="Pencarian Buku" />

            <div className="max-w-5xl mx-auto flex flex-col items-center gap-5">
                <h2 className="text-3xl font-semibold text-gray-700">
                    PENCARIAN BUKU
                </h2>
                <div className="p-10 rounded-lg shadow-lg bg-[#FCF8F3] w-full">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="search" className="text-gray-800">
                                Cari Buku:
                            </label>
                            <input
                                id="search"
                                type="search"
                                className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                            />
                        </div>
                        <div className="flex justify-between w-full gap-4">
                            <div className="flex flex-col gap-1 w-full">
                                <label
                                    htmlFor="category"
                                    className="text-gray-800"
                                >
                                    Kategori:
                                </label>
                                <select
                                    id="category"
                                    className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                >
                                    <option value="1">Fiksi</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="year" className="text-gray-800">
                                    Tahun:
                                </label>
                                <select
                                    id="year"
                                    className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                >
                                    <option value="1">2020</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label
                                    htmlFor="language"
                                    className="text-gray-800"
                                >
                                    Bahasa:
                                </label>
                                <select
                                    id="language"
                                    className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                >
                                    <option value="1">Bahasa Indonesia</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label
                                    htmlFor="order"
                                    className="text-gray-800"
                                >
                                    Urut berdasarkan:
                                </label>
                                <select
                                    id="order"
                                    className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                >
                                    <option value="1">Terbaru</option>
                                </select>
                            </div>
                        </div>
                        <button className="w-full rounded-md py-2 px-5 bg-blue-500 text-white outline-none focus:ring-4 focus:ring-blue-200/95 duration-100">
                            Cari Buku
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-10 max-w-5xl mx-auto p-10 rounded-lg shadow-lg bg-[#FCF8F3]">
                <div className="grid grid-cols-6 gap-5">
                    {books.map((book) => (
                        <div key={book.id} className="max-w-40">
                            <img
                                src={filosofiTerasImg}
                                alt={book.title}
                                width={200}
                            />
                            <div className="flex flex-col mt-2">
                                <Link
                                    href={route("book.show", book.id)}
                                    className="text-blue-600 text-base truncate"
                                >
                                    {book.title}
                                </Link>
                                <p className="text-gray-500 text-sm truncate">
                                    {book.authors
                                        .map((author) => author.name)
                                        .join(", ")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Guest>
    );
}
