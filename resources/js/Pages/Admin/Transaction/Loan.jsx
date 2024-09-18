import { Breadcrumbs } from "@/Components/Breadcrumbs";
import Card from "@/Components/Card";
import DataTable from "@/Components/DataTable";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { LOAN_BREADCRUMBS } from "@/constants/breadcrumbs";
const Loan = ({ auth, loans }) => {
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
                return row.users.name;
            },
            header: "Nama Anggota",
        },
        {
            accessorFn: (row) => {
                return row.books.title;
            },
            header: "Nama Buku",
        },
        {
            accessorKey: "loan_date",
            header: "Tanggal Pinjam",
        },
        {
            accessorKey: "due_date",
            header: "Jatuh Tempo",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                return (
                    <div className="flex justify-center items-center">
                        <span
                            className={`badge text-xs tracking-wider text-bold text-white uppercase ${
                                row.original.status === "dipinjam"
                                    ? "badge-info"
                                    : row.original.status === "dikembalikan"
                                    ? "badge-success"
                                    : "badge-error"
                            }`}
                        >
                            {row.original.status}
                        </span>
                    </div>
                );
            },
        },
    ];

    return (
        <Authenticated auth={auth} header="Peminjaman">
            <Head title="Peminjaman" />

            <div className="space-y-10 mt-5">
                <Breadcrumbs data={LOAN_BREADCRUMBS} />

                <Card>
                    <div className="flex justify-end items-center">
                        <Link
                            role="button"
                            href={route("loan.create")}
                            className="btn btn-sm md:btn-md btn-info"
                        >
                            Tambah
                        </Link>
                    </div>

                    <DataTable columns={columns} data={loans} />
                </Card>
            </div>
        </Authenticated>
    );
};

export default Loan;
