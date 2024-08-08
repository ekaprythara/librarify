import React from "react";

import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { GoChevronRight } from "react-icons/go";

const Book = ({ auth, books }) => {
    return (
        <Authenticated auth={auth}>
            <Head title="Buku" />
            <div className="space-y-10">
                <h2 className="text-3xl font-semibold text-gray-700">Buku</h2>
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
                    <span className="text-blue-600">Buku</span>
                </div>
                <Card>
                    <div className="flex flex-col gap-10">
                        {auth.isAdmin && (
                            <div className="flex justify-end items-center">
                                <Link
                                    as="button"
                                    href={route("book.create")}
                                    className="py-2 text-center px-4 rounded-lg text-lg bg-blue-600 text-white w-fit"
                                >
                                    Tambah
                                </Link>
                            </div>
                        )}
                        <div className="grid grid-cols-6 gap-5">
                            {books.data.length === 0 ? (
                                <div className="col-span-6 text-center">
                                    <span className="font-medium text-lg text-gray-700 w-full">
                                        Tidak ada buku. Ingin menambah data
                                        baru?
                                    </span>
                                </div>
                            ) : (
                                books.data.map((book) => (
                                    <div key={book.id} className="max-w-40">
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
                                        <div className="flex flex-col mt-2">
                                            <Link
                                                href={route(
                                                    "book.show",
                                                    book.id
                                                )}
                                                className="text-blue-600 text-base truncate"
                                                title={book.title}
                                            >
                                                {book.title}
                                            </Link>
                                            <p className="text-gray-500 text-sm truncate">
                                                {book.authors
                                                    .map(
                                                        (author) => author.name
                                                    )
                                                    .join(", ")}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        {books.data.length === 0 ? null : (
                            <div className="flex justify-between items-center p-2">
                                <span className="font-inter text-base text-gray-700">
                                    Showing{" "}
                                </span>
                                <div className="flex justify-end items-center mt-5">
                                    <button className="py-2 px-3 font-inter text-base bg-white text-gray-700 border border-slate-300 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 focus:outline-none focus:z-10 transition-color duration-100 rounded-l-md mb-2">
                                        <Link href={books.first_page_url}>
                                            First
                                        </Link>
                                    </button>
                                    {books.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`py-2 px-3 font-inter text-base text-gray-700 border border-slate-300 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 focus:outline-none focus:z-10 transition-color duration-100 mb-2 ${
                                                link.active &&
                                                "bg-blue-600 text-white"
                                            }`}
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            ></div>
                                        </Link>
                                    ))}
                                    <button className="py-2 px-3 font-inter text-base bg-white text-gray-700 border border-slate-300 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 focus:outline-none focus:z-10 transition-color duration-100 rounded-r-md mb-2">
                                        Last
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </Authenticated>
    );
};

export default Book;
