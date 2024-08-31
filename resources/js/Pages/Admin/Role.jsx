import Card from "@/Components/Card";
import DataTable from "@/Components/DataTable";
import Modal from "@/Components/Modal";
import WarningButton from "@/Components/WarningButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Role = ({ auth, roles }) => {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    const columns = [
        {
            accessorKey: "book_limit",
            header: "Limit Buku",
        },
        {
            accessorKey: "day_limit",
            header: "Limit Hari",
        },
        {
            header: "Aksi",
            cell: ({ row }) => {
                const roles = row.original;

                return (
                    <div className="flex justify-center items-center">
                        <Link href={route("role.edit", roles.id)}>
                            <WarningButton>Edit</WarningButton>
                        </Link>
                    </div>
                );
            },
        },
    ];

    return (
        <Authenticated auth={auth}>
            <Head title="Role" />
            <div className="space-y-10">
                <h2 className="text-3xl font-semibold text-gray-700">Role</h2>
                <Card>
                    <DataTable columns={columns} data={roles} />
                </Card>
            </div>
        </Authenticated>
    );
};

export default Role;
