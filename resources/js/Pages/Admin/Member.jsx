import Card from "@/Components/Card";
import DataTable from "@/Components/DataTable";
import Modal from "@/Components/Modal";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";

const Member = ({ auth, members }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, errors, reset } = useForm({
        username: "",
        password: "",
        password_confirmation: "",
        name: "",
        address: "",
        phone_number: "",
        email: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/anggota", {
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
            },
        });
    };

    const columns = [
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
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="py-2 px-4 rounded-lg text-lg bg-blue-500 text-white font-lato"
                            >
                                Tambah
                            </button>
                            <Modal
                                show={isModalOpen}
                                onClose={() => setIsModalOpen(!isModalOpen)}
                            >
                                <div className="p-10">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-2"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <label
                                                htmlFor="username"
                                                className="text-gray-800"
                                            >
                                                Nama Pengguna
                                            </label>
                                            <input
                                                id="username"
                                                type="text"
                                                value={data.username}
                                                onChange={(e) =>
                                                    setData(
                                                        "username",
                                                        e.target.value
                                                    )
                                                }
                                                className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                            />
                                            {errors.username && (
                                                <p className="text-sm text-red-600">
                                                    {errors.username}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label
                                                htmlFor="password"
                                                className="text-gray-800"
                                            >
                                                Kata Sandi
                                            </label>
                                            <input
                                                id="password"
                                                type="password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                            />
                                            {errors.password && (
                                                <p className="text-sm text-red-600">
                                                    {errors.password}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label
                                                htmlFor="password_confirm"
                                                className="text-gray-800"
                                            >
                                                Konfirmasi Kata Sandi
                                            </label>
                                            <input
                                                id="password_confirmation"
                                                type="password"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                                className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                            />
                                            {errors.password_confirmation && (
                                                <p className="text-sm text-red-600">
                                                    {
                                                        errors.password_confirmation
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label
                                                htmlFor="name"
                                                className="text-gray-800"
                                            >
                                                Nama
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-red-600">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label
                                                htmlFor="address"
                                                className="text-gray-800"
                                            >
                                                Address{" "}
                                            </label>
                                            <input
                                                id="address"
                                                type="text"
                                                value={data.address}
                                                onChange={(e) =>
                                                    setData(
                                                        "address",
                                                        e.target.value
                                                    )
                                                }
                                                className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                            />
                                            {errors.address && (
                                                <p className="text-sm text-red-600">
                                                    {errors.address}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label
                                                htmlFor="phone_number"
                                                className="text-gray-800"
                                            >
                                                No. Telepon
                                            </label>
                                            <input
                                                id="phone_number"
                                                type="tel"
                                                value={data.phone_number}
                                                onChange={(e) =>
                                                    setData(
                                                        "phone_number",
                                                        e.target.value
                                                    )
                                                }
                                                className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                            />
                                            {errors.phone_number && (
                                                <p className="text-sm text-red-600">
                                                    {errors.phone_number}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label
                                                htmlFor="email"
                                                className="text-gray-800"
                                            >
                                                Surel
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-600">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            type="submit"
                                            className="mt-2 rounded-md py-2 px-5 bg-blue-500 text-white outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </Modal>
                        </div>
                        <DataTable columns={columns} data={members} />
                    </div>
                </Card>
            </div>
        </Authenticated>
    );
};

export default Member;
