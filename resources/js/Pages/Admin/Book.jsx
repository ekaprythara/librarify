import { GoChevronRight } from "react-icons/go";
import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Book = ({ auth, books }) => {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    console.log(books);

    return (
        <Authenticated auth={auth} header="Buku">
            <Head title="Buku" />

            <div className="space-y-10 mt-5">
                {/* Breadcrumbs */}
                <div className="breadcrumbs flex justify-end items-center text-sm text-gray-700">
                    <ul>
                        <li>
                            <Link href={route("dashboard")}>Dashboard</Link>
                        </li>
                        <li>Buku</li>
                    </ul>
                </div>
                {/* End of Breadcrumbs */}

                <Card>
                    {auth.isAdmin && (
                        <div className="flex justify-end items-center">
                            <Link
                                role="button"
                                href={route("book.create")}
                                className="btn btn-sm md:btn-md btn-info me-2"
                            >
                                Tambah
                            </Link>
                        </div>
                    )}
                    <div className="flex flex-col justify-center items-center gap-10 mt-5">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                            {books.data.length === 0 ? (
                                <div className="col-span-6 text-center">
                                    <span className="font-medium text-lg text-gray-700 w-full">
                                        Tidak ada buku. Ingin menambah data
                                        baru?
                                    </span>
                                </div>
                            ) : (
                                books.data.map((book) => (
                                    <Link
                                        href={route("book.show", book.id)}
                                        key={book.id}
                                        className="max-w-40"
                                    >
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
                                        <div className="flex flex-col mt-2">
                                            <span
                                                className="text-blue-600 text-base truncate"
                                                title={book.title}
                                            >
                                                {book.title}
                                            </span>
                                            <p className="text-gray-500 text-sm truncate">
                                                {book.authors
                                                    .map(
                                                        (author) => author.name
                                                    )
                                                    .join(", ")}
                                            </p>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </Authenticated>
    );
};

export default Book;
