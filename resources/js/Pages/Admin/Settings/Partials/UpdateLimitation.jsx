import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import React from "react";

const UpdateLimitation = ({ limitation }) => {
    const { data, setData, patch, errors } = useForm({
        book_limit: limitation.book_limit,
        day_limit: limitation.day_limit,
    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        patch(route("setting.update"));
    };

    return (
        <section className="max-w-xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900">Batasan</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ubah batasan jumlah buku yang dipinjam dan durasi
                    peminjaman.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="flex flex-col gap-1">
                    <label htmlFor="book_limit">Batas Buku</label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        className="range range-sm"
                        step="1"
                        id="book_limit"
                        defaultValue={data.book_limit}
                        onChange={(e) => setData("book_limit", e.target.value)}
                    />
                    <div className="flex w-full justify-between px-2 text-xs">
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="day_limit">Batas Hari</label>
                    <input
                        type="range"
                        min="1"
                        max="14"
                        className="range range-sm"
                        step="1"
                        id="day_limit"
                        defaultValue={data.day_limit}
                        onChange={(e) => setData("day_limit", e.target.value)}
                    />
                    <div className="flex w-full justify-between px-2 text-xs">
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                    </div>
                </div>
                <button className="btn btn-info">Submit</button>
            </form>
        </section>
    );
};

export default UpdateLimitation;
