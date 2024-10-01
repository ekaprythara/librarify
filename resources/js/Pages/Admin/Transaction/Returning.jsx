import { Breadcrumbs } from "@/Components/Breadcrumbs";
import Card from "@/Components/Card";
import DataTable from "@/Components/DataTable";
import { RETURNING_BREADCRUMBS } from "@/constants/breadcrumbs";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Returning = ({ auth, returnings }) => {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const columns = [
        {
            accessorFn: (row) => {
                return row.loans.users.name;
            },
            header: "Nama Anggota",
        },
        {
            accessorFn: (row) => {
                return row.loans.books.title;
            },
            header: "Nama Buku",
        },
        {
            accessorFn: (row) => {
                return row.loans.loan_date;
            },
            header: "Tanggal Pinjam",
        },
        {
            accessorFn: (row) => {
                return row.loans.due_date;
            },
            header: "Jatuh Tempo",
        },
        {
            accessorKey: "return_date",
            header: "Tanggal Kembali",
        },
        {
            accessorKey: "isLost",
            header: "Status",
            cell: ({ row }) => {
                const isLost = row.original.isLost;

                return (
                    <div className="flex justify-center items-center">
                        <span
                            className={`badge text-xs tracking-wider text-bold text-white uppercase ${
                                isLost === 1 ? "badge-error" : "badge-success"
                            }`}
                        >
                            {isLost === 1 ? "Hilang" : "Dikembalikan"}
                        </span>
                    </div>
                );
            },
        },
    ];

    return (
        <Authenticated auth={auth} header="Pengembalian">
            <Head title="Pengembalian" />

            <div className="space-y-10 mt-5">
                <Breadcrumbs data={RETURNING_BREADCRUMBS} />

                <Card>
                    <div className="flex justify-end items-center">
                        <Link
                            role="button"
                            href={route("returning.create")}
                            className="btn btn-sm md:btn-md btn-info"
                        >
                            Tambah
                        </Link>
                    </div>

                    <DataTable columns={columns} data={returnings} />
                </Card>
            </div>
        </Authenticated>
    );
};

export default Returning;
