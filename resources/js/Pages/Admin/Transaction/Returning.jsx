import { Breadcrumbs } from "@/Components/Breadcrumbs";
import Card from "@/Components/Card";
import DataTable from "@/Components/DataTable";
import { RETURNING_BREADCRUMBS } from "@/constants/breadcrumbs";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
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
                return row.loans.books.title;
            },
            header: "Nama Buku",
        },
        {
            accessorFn: (row) => {
                return row.loans.users.name;
            },
            header: "Nama Anggota",
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
            accessorKey: "fine",
            header: "Denda",
            cell: ({ row }) => {
                const fine = row.original.fine;

                return (
                    <div className="flex justify-center items-center">
                        <span>{`Rp. ${fine}`}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "isPaid",
            header: "Dibayar",
            cell: ({ row }) => {
                const isPaid = row.original.isPaid;

                return (
                    <div className="flex justify-center items-center">
                        <span className="text-center">
                            {isPaid ? "LUNAS" : "BELUM LUNAS"}
                        </span>
                    </div>
                );
            },
        },
        {
            header: "Aksi",
            cell: ({ row }) => {
                const isPaid = row.original.isPaid;

                const returnDate = new Date(row.original.return_date);
                const dueDate = new Date(row.original.loans.due_date);

                // Menghitung selisih waktu dalam milidetik
                const differenceInTime = returnDate - dueDate;

                // Menghitung selisih hari
                const differenceInDays = differenceInTime / (1000 * 3600 * 24);

                const { data, setData, patch, errors, reset } = useForm({
                    isPaid: 1,
                });

                const handleSubmit = (e) => {
                    e.preventDefault();

                    patch(route("returning.update", row.original.id), {
                        onSuccess: () => {
                            reset();
                        },
                    });
                };

                return (
                    <>
                        {isPaid ? (
                            <button className="btn btn-error btn-disabled btn-md">
                                Bayar
                            </button>
                        ) : (
                            <>
                                <button
                                    className="btn btn-error btn-md"
                                    onClick={() =>
                                        document
                                            .getElementById(
                                                `payTheFine${row.original.id}`
                                            )
                                            .showModal()
                                    }
                                >
                                    Bayar
                                </button>

                                <dialog
                                    id={`payTheFine${row.original.id}`}
                                    className="modal"
                                >
                                    <div className="modal-box max-w-3xl">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                ✕
                                            </button>
                                        </form>
                                        <h3 className="font-bold text-lg">
                                            Rincian Denda
                                        </h3>
                                        <form
                                            onSubmit={handleSubmit}
                                            className="pt-4"
                                        >
                                            <div className="overflow-x-auto">
                                                <table className="table">
                                                    {/* head */}
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                Tanggal Kembali
                                                            </th>
                                                            <th>Jatuh Tempo</th>
                                                            <th>Selisih</th>
                                                            <th>
                                                                Denda per Hari
                                                            </th>
                                                            <th>Total Denda</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {
                                                                    row.original
                                                                        .return_date
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    row.original
                                                                        .loans
                                                                        .due_date
                                                                }
                                                            </td>
                                                            <td>
                                                                {`${differenceInDays} hari`}
                                                            </td>
                                                            <td>2000</td>
                                                            <td>
                                                                {`Rp. ${row.original.fine}`}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="flex justify-end items-center mt-4">
                                                <button className="btn btn-error btn-md">
                                                    Bayar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </dialog>
                            </>
                        )}
                    </>
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
