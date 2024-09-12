import Card from "@/Components/Card";
import DataTable from "@/Components/DataTable";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Publisher = ({ auth, publishers }) => {
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
        <Authenticated auth={auth} header="Penerbit">
            <Head title="Penerbit" />

            <div className="space-y-10 mt-5">
                {/* Breadcrumbs */}
                <div className="breadcrumbs flex justify-end items-center text-sm text-gray-700">
                    <ul>
                        <li>
                            <Link href={route("dashboard")}>Dashboard</Link>
                        </li>
                        <li>Penerbit</li>
                    </ul>
                </div>
                {/* End of Breadcrumbs */}

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
