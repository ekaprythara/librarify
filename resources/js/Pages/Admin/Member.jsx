import { Breadcrumbs } from "@/Components/Breadcrumbs";
import Card from "@/Components/Card";
import DataTable from "@/Components/DataTable";
import { MEMBER_BREADCRUMBS } from "@/constants/breadcrumbs";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Member = ({ auth, members }) => {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    const columns = [
        {
            header: "Foto",
            cell: ({ row }) => {
                const image = row.original.image;
                return (
                    <div className="flex justify-center items-center">
                        {image ? (
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img
                                        src={`/storage/${image}`}
                                        alt="Profile Picture"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img
                                        src="https://placehold.co/100"
                                        alt="Profile Picture"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: "username",
            header: "Nama Pengguna",
        },
        {
            accessorKey: "name",
            header: "Nama",
        },
        {
            accessorKey: "phone_number",
            header: "No. Telepon",
        },
        {
            accessorKey: "email",
            header: "Surel",
        },
    ];

    return (
        <Authenticated auth={auth} header="Anggota">
            <Head title="Anggota" />

            <div className="space-y-10 mt-5">
                <Breadcrumbs data={MEMBER_BREADCRUMBS} />

                <Card>
                    <div className="flex justify-end items-center">
                        <Link
                            role="button"
                            href={route("member.create")}
                            className="btn btn-sm md:btn-md btn-info"
                        >
                            Tambah
                        </Link>
                    </div>

                    <DataTable columns={columns} data={members} />
                </Card>
            </div>
        </Authenticated>
    );
};

export default Member;
