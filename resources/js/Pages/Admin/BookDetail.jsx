import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import { GoChevronRight } from "react-icons/go";

const BookDetail = ({ auth, book }) => {
    console.log(book);

    // Function to handle delete
    const handleDelete = (e) => {
        e.preventDefault();

        router.post(`/buku/${book.id}/delete`, {
            _method: "delete",
        });
    };

    return (
        <Authenticated auth={auth}>
            <Head title={`Detail Buku ${book.title}`} />
            <div className="space-y-10">
                <h2 className="text-3xl font-semibold text-gray-700">
                    Detail Buku
                </h2>
                <div className="flex justify-end items-center text-gray-700">
                    <span>
                        <Link
                            href={route("dashboard")}
                            className="hover:text-blue-600 transition-colors duration-300"
                        >
                            Dashboard
                        </Link>
                    </span>
                    <span>
                        <GoChevronRight size={20} />
                    </span>
                    <span>
                        <Link
                            href={route("book.index")}
                            className="hover:text-blue-600 transition-colors duration-300"
                        >
                            Buku
                        </Link>
                    </span>
                    <span>
                        <GoChevronRight size={20} />
                    </span>
                    <span className="text-blue-600">Detail Buku</span>
                </div>
                <Card>
                    <div className="grid grid-cols-1 auto-rows-auto gap-8 md:grid-rows-1 md:grid-cols-[1fr_2fr_1fr]">
                        <div className="flex items-start justify-center relative">
                            {book.image ? (
                                <img
                                    src={`/storage/${book.image}`}
                                    alt={book.title}
                                    width={200}
                                    className="sticky top-28 rounded-lg"
                                />
                            ) : (
                                <img
                                    src="https://placehold.co/200x300"
                                    alt={book.title}
                                    width={200}
                                    className="sticky top-28 rounded-lg"
                                />
                            )}
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <span className="text-sm text-gray-700">
                                    {book.authors
                                        .map((authors) => authors.name)
                                        .join(", ")}
                                </span>
                                <h3 className="text-2xl text-gray-800">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-gray-700 w-full md:max-w-lg text-justify">
                                    {book.description}
                                </p>
                            </div>
                            <div className="w-full md:max-w-lg">
                                <span className="block text-lg text-gray-800 mb-2">
                                    Rincian Buku
                                </span>
                                <div className="grid grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <div>
                                            <span className="block text-gray-700">
                                                Jumlah Halaman
                                            </span>
                                            <span className="block text-gray-800 truncate">
                                                {book.pages}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="block text-gray-700">
                                                ISBN
                                            </span>
                                            <span className="block text-gray-800 truncate">
                                                {book.isbn}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="block text-gray-700">
                                                Bahasa
                                            </span>
                                            <span className="block text-gray-800 truncate">
                                                {book.language}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div>
                                            <span className="block text-gray-700">
                                                Penerbit
                                            </span>
                                            <span className="block text-gray-800 truncate">
                                                {book.publishers.name}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="block text-gray-700">
                                                Tahun Terbit
                                            </span>
                                            <span className="block text-gray-800 truncate">
                                                {book.publish_year}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="block text-gray-700">
                                                Kategori
                                            </span>
                                            <span className="block text-gray-800 truncate">
                                                {book.categories
                                                    .map(
                                                        (category) =>
                                                            category.name
                                                    )
                                                    .join(", ")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between gap-8">
                            <div className="flex flex-col gap-2">
                                <div>
                                    <span className="block text-gray-700">
                                        Jumlah Total
                                    </span>
                                    <span className="block text-gray-800">
                                        {book.stock}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-gray-700">
                                        Jumlah Tersedia
                                    </span>
                                    <span className="block text-gray-800">
                                        {book.remaining_stock}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-gray-700">
                                        Status
                                        {!!book.status ? (
                                            <span className="block mt-1 w-fit rounded-md text-center px-2 py-1 text-xs text-white font-bold uppercase bg-green-600">
                                                ACTIVE
                                            </span>
                                        ) : (
                                            <span className="block mt-1 w-fit rounded-md text-center px-2 py-1 text-xs text-white font-bold uppercase bg-red-600">
                                                INACTIVE
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                {/* Button */}
                                <Link
                                    href={route("book.edit", book.id)}
                                    role="button"
                                    className="btn btn-warning btn-sm md:btn-md"
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-error btn-sm md:btn-md"
                                    onClick={() =>
                                        document
                                            .getElementById("my_modal_2")
                                            .showModal()
                                    }
                                >
                                    Hapus
                                </button>
                            </div>
                            {/* Modal */}
                            <dialog id="my_modal_2" className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">
                                        Hello!
                                    </h3>
                                    <form
                                        onSubmit={handleDelete}
                                        className="flex flex-col gap-2"
                                    >
                                        <span className="text-base py-5">
                                            Apakah Anda yakin ingin menghapus "
                                            {book.title}
                                            "?
                                        </span>
                                        <button className="mt-2 rounded-md py-2 px-5 bg-red-500 text-white outline-none focus:ring-4 focus:ring-blue-200/95 duration-100">
                                            Hapus
                                        </button>
                                    </form>
                                </div>
                                <form
                                    method="dialog"
                                    className="modal-backdrop"
                                >
                                    <button>close</button>
                                </form>
                            </dialog>
                        </div>
                    </div>
                </Card>
            </div>
        </Authenticated>
    );
};

export default BookDetail;
