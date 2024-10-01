import { Link } from "@inertiajs/react";
import React from "react";

const BookList = ({ books }) => {
    return (
        <div className="flex flex-col justify-center items-center gap-10 mt-5">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {books.data.length === 0 ? (
                    <div className="col-span-6 text-center">
                        <span className="font-medium text-lg text-gray-700 w-full">
                            Tidak ada buku. Ingin menambah data baru?
                        </span>
                    </div>
                ) : (
                    books.data.map((book) => (
                        <Link
                            href={route("book.show", book.id)}
                            key={book.id}
                            className="max-w-40"
                        >
                            <div className="grid grid-rows-[1.8fr_0.2fr] grid-cols-1 h-full">
                                <div className="flex items-center bg-slate-200 rounded-md">
                                    {book.image ? (
                                        <img
                                            src={`/storage/${book.image}`}
                                            alt={book.title}
                                            width={200}
                                            className="rounded-md"
                                        />
                                    ) : (
                                        <img
                                            src="https://placehold.co/200x300"
                                            alt={book.title}
                                            width={200}
                                            className="rounded-md"
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col mt-2">
                                    <span
                                        className="text-blue-600 text-base truncate"
                                        title={book.title}
                                    >
                                        {book.title}
                                    </span>
                                    <p className="text-gray-500 text-sm truncate">
                                        {book.authors
                                            .map((author) => author.name)
                                            .join(", ")}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default BookList;
