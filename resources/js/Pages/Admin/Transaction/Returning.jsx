import Card from "@/Components/Card";
import DataTable from "@/Components/DataTable";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";
import { GoChevronRight } from "react-icons/go";

const Returning = ({ auth, returnings }) => {
    const { flash } = usePage().props;
    console.log(returnings);

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
    ];

    return (
        <Authenticated auth={auth}>
            <Head title="Pengembalian" />
            <div className="space-y-10">
                <h2 className="text-3xl font-semibold text-gray-700">
                    Pengembalian
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
                    <span className="text-blue-600">Pengembalian</span>
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
                        <DataTable columns={columns} data={returnings} />
                    </div>
                </Card>
            </div>
        </Authenticated>
    );
};

export default Returning;
