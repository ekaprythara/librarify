import Card from "@/Components/Card";
import DataTable from "@/Components/DataTable";
import Modal from "@/Components/Modal";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";

const Publisher = ({ auth, publishers }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, errors, reset } = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/penerbit", {
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
            },
        });
    };

    const columns = [
        {
            accessorKey: "name",
            header: "Nama",
        },
    ];

    return (
        <Authenticated auth={auth}>
            <Head title="Penerbit" />
            <div className="space-y-10">
                <h2 className="text-3xl font-semibold text-gray-700">
                    Penerbit
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
                        <DataTable columns={columns} data={publishers} />
                    </div>
                </Card>
            </div>
        </Authenticated>
    );
};

export default Publisher;
