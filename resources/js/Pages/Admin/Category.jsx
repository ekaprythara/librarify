import { Breadcrumbs } from "@/Components/Breadcrumbs";
import Card from "@/Components/Card";
import DataTable from "@/Components/DataTable";
import { CATEGORY_BREADCRUMBS } from "@/constants/breadcrumbs";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Category = ({ auth, categories }) => {
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
                            href={route("category.edit", id)}
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
        <Authenticated auth={auth} header="Kategori">
            <Head title="Kategori" />

            <div className="space-y-10 mt-5">
                <Breadcrumbs data={CATEGORY_BREADCRUMBS} />

                <Card>
                    <div className="flex justify-end items-center">
                        <Link
                            role="button"
                            href={route("category.create")}
                            className="btn btn-sm md:btn-md btn-info"
                        >
                            Tambah
                        </Link>
                    </div>
                    <DataTable columns={columns} data={categories} />
                </Card>
            </div>
        </Authenticated>
    );
};

export default Category;
