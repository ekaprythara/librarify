import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Card from "@/Components/Card";
import { Breadcrumbs } from "@/Components/Breadcrumbs";
import { AUTHOR_CREATE_BREADCRUMBS } from "@/constants/breadcrumbs";
import { useEffect } from "react";
import { useRef } from "react";

export default function AuthorCreate({ auth }) {
    const inputRef = useRef();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const { data, setData, post, errors } = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(data);
        post(route("author.store"));
    };

    return (
        <AuthenticatedLayout auth={auth} header="Tambah">
            <Head title="Pengarang" />

            <div className="space-y-10 mt-5">
                <Breadcrumbs data={AUTHOR_CREATE_BREADCRUMBS} />

                <Card>
                    <section className="max-w-xl">
                        <header>
                            <h3 className="text-lg font-medium text-gray-900">
                                Tambah Pengarang
                            </h3>

                            <p className="mt-1 text-sm text-gray-600">
                                Tambahkan pengarang untuk membantu dalam
                                mengidentifikasi, dan menghargai karya.
                            </p>
                        </header>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col mt-6 space-y-6"
                        >
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
                                        ref={inputRef}
                                    />
                                </label>
                                {errors.name && (
                                    <p className="text-sm text-red-600">
                                        {errors.name}
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
                    </section>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
