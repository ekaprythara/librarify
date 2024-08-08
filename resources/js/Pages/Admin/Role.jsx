import Card from "@/Components/Card";
import DataTable from "@/Components/DataTable";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const Role = ({ auth, roles }) => {
    const columns = [
        {
            accessorKey: "name",
            header: "Nama",
        },
        {
            accessorKey: "book_limit",
            header: "Limit Buku",
        },
        {
            accessorKey: "day_limit",
            header: "Limit Hari",
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
