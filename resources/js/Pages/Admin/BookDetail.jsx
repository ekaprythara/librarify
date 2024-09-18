import { Breadcrumbs } from "@/Components/Breadcrumbs";
import Card from "@/Components/Card";
import { BOOK_SHOW_BREADCRUMBS } from "@/constants/breadcrumbs";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import { FaBookmark, FaShareAlt } from "react-icons/fa";
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
        <Authenticated auth={auth} header="Detail Buku">
            <Head title={`Detail Buku ${book.title}`} />

            <div className="space-y-10 mt-5">
                <Breadcrumbs data={BOOK_SHOW_BREADCRUMBS} />

                <Card>
                    <div className="grid grid-cols-1 auto-rows-auto gap-8 md:grid-rows-1 md:grid-cols-[1fr_2fr_1fr]">
                        <div className="flex items-start justify-center">
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
                                            <span className="badge badge-success block text-xs tracking-wider text-bold text-white uppercase">
                                                ACTIVE
                                            </span>
                                        ) : (
                                            <span className="badge badge-error block text-xs tracking-wider text-bold text-white uppercase">
                                                INACTIVE
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                {/* Button */}
                                {auth.isAdmin ? (
                                    <>
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
                                                    .getElementById(
                                                        "my_modal_2"
                                                    )
                                                    .showModal()
                                            }
                                        >
                                            Hapus
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={route("book.edit", book.id)}
                                            role="button"
                                            className="btn btn-success btn-sm md:btn-md"
                                        >
                                            <FaBookmark size={20} />
                                            <span className="ms-1">Simpan</span>
                                        </Link>
                                        <button
                                            className="btn btn-info btn-sm md:btn-md flex justify-center items-center"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "my_modal_2"
                                                    )
                                                    .showModal()
                                            }
                                        >
                                            <FaShareAlt size={20} />
                                            <span className="ms-1">
                                                Bagikan
                                            </span>
                                        </button>
                                    </>
                                )}
                            </div>
                            {/* Modal */}
                            <dialog id="my_modal_2" className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Hapus</h3>
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
