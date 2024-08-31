import Card from "@/Components/Card";
import DataTable from "@/Components/DataTable";
import Modal from "@/Components/Modal";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";

const Member = ({ auth, members }) => {
    const columns = [
        {
            header: "Foto",
            cell: ({ row }) => {
                const image = row.original.image;
                console.log(image);
                return (
                    <div className="flex justify-center items-center">
                        {image ? (
                            <img
                                src={`/storage/${image}`}
                                alt="Profile Picture"
                                width={100}
                                height={100}
                                className="rounded-full"
                            />
                        ) : (
                            <img
                                src="https://placehold.co/100"
                                alt="Profile Picture"
                                width={100}
                                height={100}
                                className="rounded-full"
                            />
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
        <Authenticated auth={auth}>
            <Head title="Anggota" />
            <div className="space-y-10">
                <h2 className="text-3xl font-semibold text-gray-700">
                    Anggota
                </h2>
                <Card>
                    <div>
                        <div className="flex justify-end items-center">
                            <Link href={route("member.create")}>
                                <button className="py-2 px-4 rounded-lg text-lg bg-blue-500 text-white font-lato">
                                    Tambah
                                </button>
                            </Link>
                        </div>
                        <DataTable columns={columns} data={members} />
                    </div>
                </Card>
            </div>
        </Authenticated>
    );
};

export default Member;
