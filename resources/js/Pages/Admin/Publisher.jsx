import { Breadcrumbs } from "@/Components/Breadcrumbs";
import Card from "@/Components/Card";
import DataTable from "@/Components/DataTable";
import { PUBLISHER_BREADCRUMBS } from "@/constants/breadcrumbs";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Publisher = ({ auth, publishers }) => {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    const columns = [
        {
            accessorKey: "name",
            header: "Nama",
        },
        {
            header: "Aksi",
            cell: ({ row }) => {
                const id = row.original.id;
                return (
                    <div className="flex justify-center items-center">
                        <Link
                            href={route("publisher.edit", id)}
                            as="button"
                            className="btn btn-warning"
                        >
                            Edit
                        </Link>
                    </div>
                );
            },
        },
    ];

    return (
        <Authenticated auth={auth} header="Penerbit">
            <Head title="Penerbit" />

            <div className="space-y-10 mt-5">
                <Breadcrumbs data={PUBLISHER_BREADCRUMBS} />

                <Card>
                    <div className="flex justify-end items-center">
                        <Link
                            role="button"
                            href={route("publisher.create")}
                            className="btn btn-sm md:btn-md btn-info"
                        >
                            Tambah
                        </Link>
                    </div>
                    <DataTable columns={columns} data={publishers} />
                </Card>
            </div>
        </Authenticated>
    );
};

export default Publisher;
