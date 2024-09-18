import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Breadcrumbs } from "@/Components/Breadcrumbs";
import { BOOK_BREADCRUMBS } from "@/constants/breadcrumbs";
import BookList from "./BookList";

const Book = ({ auth, books }) => {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    return (
        <Authenticated auth={auth} header="Buku">
            <Head title="Buku" />

            <div className="space-y-10 mt-5">
                <Breadcrumbs data={BOOK_BREADCRUMBS} />

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
                    <BookList books={books} />
                </Card>
            </div>
        </Authenticated>
    );
};

export default Book;
