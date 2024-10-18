import { useForm } from "@inertiajs/react";
import React from "react";

const UpdateFine = () => {
    const { data, setData, patch, errors, processing } = useForm({
        fine: "",
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("setting.update"));
    };
    return (
        <section className="max-w-xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900">Denda</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ubah batasan denda per hari.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="flex flex-col gap-1">
                    <label className="form-control w-full max-w-xl">
                        <div className="label">
                            <span className="label-text">Nama</span>
                        </div>
                        <input
                            type="text"
                            value={data.fine}
                            onChange={(e) => setData("fine", e.target.value)}
                            className="input input-sm md:input-md input-bordered w-full max-w-xl"
                        />
                    </label>
                    {errors.fine && (
                        <p className="text-sm text-red-600">{errors.fine}</p>
                    )}
                </div>

                <button className="btn btn-info" disabled={processing}>
                    Simpan
                </button>
            </form>
        </section>
    );
};

export default UpdateFine;
