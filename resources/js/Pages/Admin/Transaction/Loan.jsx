import Card from "@/Components/Card";
import DataTable from "@/Components/DataTable";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";
import { GoChevronRight } from "react-icons/go";

const Loan = ({ auth, loans }) => {
    const { flash } = usePage().props;
    console.log(flash);

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
                            className={`rounded-md text-center px-2 py-1 text-xs text-white font-bold uppercase ${
                                row.original.status === "dipinjam"
                                    ? "bg-blue-600"
                                    : row.original.status === "dikembalikan"
                                    ? "bg-green-600"
                                    : "bg-red-600"
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
        <Authenticated auth={auth}>
            <Head title="Peminjaman" />
            <div className="space-y-10">
                <h2 className="text-3xl font-semibold text-gray-700">
                    Peminjaman
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
                    <span className="text-blue-600">Peminjaman</span>
                </div>
                <Card>
                    <div>
                        <div className="flex justify-end items-center">
                            <Link
                                as="button"
                                href={route("loan.create")}
                                className="py-2 text-center px-4 rounded-lg text-lg bg-blue-600 text-white w-fit"
                            >
                                Tambah
                            </Link>
                        </div>
                        <DataTable columns={columns} data={loans} />
                    </div>
                </Card>
            </div>
        </Authenticated>
    );
};

export default Loan;
