import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

const MemberCreate = ({ auth }) => {
    const { data, setData, post, errors, reset } = useForm({
        image: null,
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

        console.log(data);
        post("/anggota/create", {
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleFileChange = (event) => {
        const image = document.querySelector("#image");
        const imagePreview = document.querySelector("#image-preview");

        imagePreview.classList.remove("hidden");
        imagePreview.classList.add("block");

        const oFReader = new FileReader();
        oFReader.readAsDataURL(image.files[0]);
        oFReader.onload = function (oFREvent) {
            imagePreview.src = oFREvent.target.result;
        };

        setData("image", event.target.files[0]);
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Anggota" />
            <div className="space-y-10">
                <h2 className="text-3xl font-semibold text-gray-700">
                    Anggota
                </h2>

                {/* Breadcrumbs */}
                <div className="breadcrumbs flex justify-end items-center text-sm text-gray-700">
                    <ul>
                        <li>
                            <Link
                                href={route("dashboard")}
                                className="hover:text-blue-600 transition-colors duration-300"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route("member.index")}
                                className="hover:text-blue-600 transition-colors duration-300"
                            >
                                Anggota
                            </Link>
                        </li>
                        <li>Tambah Anggota</li>
                    </ul>
                </div>
                {/* End of Breadcrumbs */}

                <Card>
                    <div className="p-10 max-w-xl">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-2"
                        >
                            {/* Input Image */}
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="image"
                                    className="text-sm font-medium text-gray-800"
                                >
                                    Foto Profil (1:1)
                                </label>
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="p-2 rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                />
                                {errors.image && (
                                    <p className="text-sm text-red-600">
                                        {errors.image}
                                    </p>
                                )}
                                <img
                                    id="image-preview"
                                    className="hidden mb-5"
                                    width="100"
                                    height="100"
                                />
                            </div>
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
                                        setData("username", e.target.value)
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
                                        setData("password", e.target.value)
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
                                    value={data.password_confirmation}
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
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="name" className="text-gray-800">
                                    Nama
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
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
                                        setData("address", e.target.value)
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
                                        setData("phone_number", e.target.value)
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
                                        setData("email", e.target.value)
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
                                className="mt-2 w-fit rounded-md py-2 px-5 bg-blue-500 text-white outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                            >
                                Tambah
                            </button>
                        </form>
                    </div>
                </Card>
            </div>
        </Authenticated>
    );
};

export default MemberCreate;
