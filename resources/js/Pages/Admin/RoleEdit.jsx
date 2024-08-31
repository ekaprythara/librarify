import Card from "@/Components/Card";
import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";

const RoleEdit = ({ auth, roles }) => {
    const { data, setData, patch, errors, onSuccess } = useForm({
        book_limit: roles.book_limit,
        day_limit: roles.day_limit,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        patch(`/role/${roles.id}/edit`);
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Edit Role" />
            <div className="space-y-10">
                <h2 className="text-3xl font-semibold text-gray-700">Role</h2>
                <Card>
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">
                            Update Role Limitation
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            You can change the book and day limitation for the
                            role member
                        </p>
                    </header>
                    <div className="max-w-xl mt-6 space-y-6">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-2"
                        >
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="book_limit"
                                    className="text-gray-800"
                                >
                                    Limit Buku
                                </label>
                                <input
                                    id="book_limit"
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={data.book_limit}
                                    onChange={(e) =>
                                        setData("book_limit", e.target.value)
                                    }
                                    className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                />
                                {errors.book_limit && (
                                    <p className="text-sm text-red-600">
                                        {errors.book_limit}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="day_limit"
                                    className="text-gray-800"
                                >
                                    Limit Hari
                                </label>
                                <input
                                    id="day_limit"
                                    type="number"
                                    min="1"
                                    max="14"
                                    value={data.day_limit}
                                    onChange={(e) =>
                                        setData("day_limit", e.target.value)
                                    }
                                    className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                />
                                {errors.day_limit && (
                                    <p className="text-sm text-red-600">
                                        {errors.day_limit}
                                    </p>
                                )}
                            </div>
                            <PrimaryButton className="w-fit mt-4">
                                Simpan
                            </PrimaryButton>
                        </form>
                    </div>
                </Card>
            </div>
        </Authenticated>
    );
};

export default RoleEdit;
