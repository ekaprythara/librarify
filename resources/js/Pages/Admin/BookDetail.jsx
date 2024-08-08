import Card from "@/Components/Card";
import Modal from "@/Components/Modal";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import { GoChevronRight } from "react-icons/go";
import { FiBookmark, FiShare2 } from "react-icons/fi";

const BookDetail = ({ auth, book }) => {
    console.log(book);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Function to handle delete
    const handleDelete = (e) => {
        e.preventDefault();

        router.post(
            `/buku/${book.id}/delete`,
            {
                _method: "delete",
            },
            {
                onSuccess: setIsDeleteModalOpen(false),
            }
        );
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
                            href={route("book")}
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
                    <div className="grid grid-cols-[1fr_2fr_1fr] gap-5">
                        <div className="flex items-start justify-center">
                            {book.image ? (
                                <img
                                    src={`/storage/${book.image}`}
                                    alt={book.title}
                                    width={200}
                                />
                            ) : (
                                <img
                                    src="https://placehold.co/200x300"
                                    alt={book.title}
                                    width={200}
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
                                <p className="text-sm text-gray-700 max-w-lg text-justify">
                                    {book.description}
                                </p>
                            </div>
                            <div className="max-w-lg">
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
                        <div className="flex flex-col justify-between">
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
                            {auth.isAdmin ? (
                                <div className="flex flex-col gap-2">
                                    <Link
                                        as="button"
                                        href={route("book.edit", book.id)}
                                        className="py-2 text-center px-4 w-full rounded-lg text-lg bg-yellow-500 text-gray-800"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() =>
                                            setIsDeleteModalOpen(true)
                                        }
                                        className="py-2 px-4 rounded-lg text-lg bg-red-500 text-white"
                                    >
                                        Hapus
                                    </button>

                                    <Modal
                                        title="Hapus Buku"
                                        show={isDeleteModalOpen}
                                        onClose={() =>
                                            setIsDeleteModalOpen(
                                                !isDeleteModalOpen
                                            )
                                        }
                                    >
                                        <div className="p-5 overflow-y-scroll">
                                            <form
                                                onSubmit={handleDelete}
                                                className="flex flex-col gap-2"
                                            >
                                                <span className="text-base py-5">
                                                    Apakah Anda yakin ingin
                                                    menghapus "{book.title}
                                                    "?
                                                </span>
                                                <button className="mt-2 rounded-md py-2 px-5 bg-red-500 text-white outline-none focus:ring-4 focus:ring-blue-200/95 duration-100">
                                                    Hapus
                                                </button>
                                            </form>
                                        </div>
                                    </Modal>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="py-2 px-4 w-full rounded-lg text-lg bg-blue-500 text-white"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <span>
                                                <FiShare2 size={25} />
                                            </span>
                                            <span>Bagikan</span>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="py-2 px-4 w-full rounded-lg text-lg bg-blue-500 text-white"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <span>
                                                <FiBookmark size={25} />
                                            </span>
                                            <span>Simpan</span>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </Authenticated>
    );
};

export default BookDetail;
