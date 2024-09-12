import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Card from "@/Components/Card";

export default function CategoryCreate({ auth }) {
    const { data, setData, post, errors } = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(data);
        post(route("category.store"));
    };

    return (
        <AuthenticatedLayout auth={auth} header="Tambah">
            <Head title="Kategori" />

            <div className="space-y-10 mt-5">
                {/* Breadcrumbs */}
                <div className="breadcrumbs flex justify-end items-center text-sm text-gray-700">
                    <ul>
                        <li>
                            <Link href={route("dashboard")}>Dashboard</Link>
                        </li>
                        <li>
                            <Link href={route("category.index")}>Kategori</Link>
                        </li>
                        <li>Tambah Kategori</li>
                    </ul>
                </div>
                {/* End of Breadcrumbs */}

                <Card>
                    <div className="max-w-xl">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-2"
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
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
