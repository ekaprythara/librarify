import { Breadcrumbs } from "@/Components/Breadcrumbs";
import Card from "@/Components/Card";
import { MEMBER_CREATE_BREADCRUMBS } from "@/constants/breadcrumbs";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";
import { useState } from "react";

const MemberCreate = ({ auth }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [showImage, setShowImage] = useState(false);

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

        post(route("member.store"));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImageSrc(reader.result);
                setShowImage(true);
            };

            reader.readAsDataURL(file);

            setData("image", file);
        }
    };

    return (
        <Authenticated auth={auth} header="Tambah">
            <Head title="Anggota" />

            <div className="space-y-10 mt-5">
                <Breadcrumbs data={MEMBER_CREATE_BREADCRUMBS} />

                <Card>
                    <div className="max-w-xl">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-2"
                        >
                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Upload Foto Profil (1:1)
                                        </span>
                                    </div>
                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="file-input file-input-bordered file-input-sm md:file-input-md w-full"
                                    />
                                </label>

                                {errors.image && (
                                    <p className="text-sm text-red-600">
                                        {errors.image}
                                    </p>
                                )}

                                {showImage && (
                                    <div className="avatar">
                                        <div className="w-48 md:w-52 rounded">
                                            <img src={imageSrc} alt="Preview" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full max-w-xl">
                                    <div className="label">
                                        <span className="label-text">
                                            Nama Pengguna
                                        </span>
                                    </div>
                                    <input
                                        id="username"
                                        type="text"
                                        value={data.username}
                                        onChange={(e) =>
                                            setData("username", e.target.value)
                                        }
                                        className="input input-sm md:input-md input-bordered w-full max-w-xl"
                                    />
                                </label>
                                {errors.username && (
                                    <p className="text-sm text-red-600">
                                        {errors.username}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full max-w-xl">
                                    <div className="label">
                                        <span className="label-text">
                                            Password
                                        </span>
                                    </div>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="input input-sm md:input-md input-bordered w-full max-w-xl"
                                    />
                                </label>
                                {errors.password && (
                                    <p className="text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full max-w-xl">
                                    <div className="label">
                                        <span className="label-text">
                                            Konfirmasi Password
                                        </span>
                                    </div>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        className="input input-sm md:input-md input-bordered w-full max-w-xl"
                                    />
                                </label>
                                {errors.password_confirmation && (
                                    <p className="text-sm text-red-600">
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full max-w-xl">
                                    <div className="label">
                                        <span className="label-text">Nama</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="input input-sm md:input-md input-bordered w-full max-w-xl"
                                    />
                                </label>
                                {errors.name && (
                                    <p className="text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full max-w-xl">
                                    <div className="label">
                                        <span className="label-text">
                                            Alamat
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        className="input input-sm md:input-md input-bordered w-full max-w-xl"
                                    />
                                </label>
                                {errors.address && (
                                    <p className="text-sm text-red-600">
                                        {errors.address}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full max-w-xl">
                                    <div className="label">
                                        <span className="label-text">
                                            No. Telepon
                                        </span>
                                    </div>
                                    <input
                                        type="tel"
                                        value={data.phone_number}
                                        onChange={(e) =>
                                            setData(
                                                "phone_number",
                                                e.target.value
                                            )
                                        }
                                        className="input input-sm md:input-md input-bordered w-full max-w-xl"
                                    />
                                </label>
                                {errors.phone_number && (
                                    <p className="text-sm text-red-600">
                                        {errors.phone_number}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full max-w-xl">
                                    <div className="label">
                                        <span className="label-text">
                                            Email
                                        </span>
                                    </div>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="input input-sm md:input-md input-bordered w-full max-w-xl"
                                    />
                                </label>
                                {errors.phone_number && (
                                    <p className="text-sm text-red-600">
                                        {errors.phone_number}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-info btn-sm md:btn-md w-fit mt-2"
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
