import Card from "@/Components/Card";
import DataTable from "@/Components/DataTable";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Author = ({ auth, authors }) => {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    const columns = [
        {
            accessorKey: "name",
            header: "Nama",
        },
    ];

    return (
        <Authenticated auth={auth} header="Pengarang">
            <Head title="Pengarang" />

            <div className="space-y-10 mt-5">
                {/* Breadcrumbs */}
                <div className="breadcrumbs flex justify-end items-center text-sm text-gray-700">
                    <ul>
                        <li>
                            <Link href={route("dashboard")}>Dashboard</Link>
                        </li>
                        <li>Pengarang</li>
                    </ul>
                </div>
                {/* End of Breadcrumbs */}

                <Card>
                    <div className="flex justify-end items-center">
                        <Link
                            role="button"
                            href={route("author.create")}
                            className="btn btn-sm md:btn-md btn-info"
                        >
                            Tambah
                        </Link>
                    </div>
                    <DataTable columns={columns} data={authors} />
                </Card>
            </div>
        </Authenticated>
    );
};

export default Author;
