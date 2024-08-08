import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Select from "react-select";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { GoChevronRight } from "react-icons/go";
import makeAnimated from "react-select/animated";

const LoanCreate = ({ auth, books, users }) => {
    const [selectedBooks, setSelectedBooks] = useState([]);

    const { flash } = usePage().props;
    console.log(flash);

    const formattedBooks = books.map((book) => ({
        value: book.id,
        label: `${book.title} (${book.publish_year})`,
    }));

    const style = {
        control: (base) => ({
            ...base,
            "input[type='text']:focus": { boxShadow: "none" },
        }),
    };

    const { data, setData, post, errors, reset } = useForm({
        book_id: selectedBooks,
        user_id: users[0].id,
        loan_date: "",
        due_date: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(`/peminjaman/create`, {
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleSelectBooksChange = (selectedOptions) => {
        setSelectedBooks(selectedOptions);

        setData(
            "book_id",
            selectedOptions.map((option) => option.value)
        );
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Tambah" />
            <div className="space-y-10">
                <h2 className="text-3xl font-semibold text-gray-700">Tambah</h2>
                <div className="flex justify-end items-center text-gray-700">
                    <span>
                        <Link
                            href={route("dashboard")}
                            className="hover:text-blue-600 transition-colors duration-300"
                        >
                            Dashboard
                        </Link>
                    </span>
                    <span>
                        <GoChevronRight size={20} />
                    </span>
                    <span>
                        <Link
                            href={route("loan.index")}
                            className="hover:text-blue-600 transition-colors duration-300"
                        >
                            Peminjaman
                        </Link>
                    </span>
                    <span>
                        <GoChevronRight size={20} />
                    </span>
                    <span className="text-blue-600">Tambah Peminjam</span>
                </div>
                <Card>
                    <div className="max-w-xl">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="flex flex-col gap-1 w-full">
                                <label
                                    htmlFor="user_id"
                                    className="text-sm font-medium text-gray-800"
                                >
                                    Pilih Anggota:
                                </label>
                                <select
                                    id="user_id"
                                    className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                    onChange={(e) =>
                                        setData("user_id", e.target.value)
                                    }
                                >
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.user_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.user_id}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label
                                    htmlFor="book_id"
                                    className="text-sm font-medium text-gray-800"
                                >
                                    Pilih Buku:
                                </label>
                                <Select
                                    id="book_id"
                                    options={formattedBooks}
                                    components={makeAnimated()}
                                    onChange={handleSelectBooksChange}
                                    closeMenuOnSelect={false}
                                    isMulti
                                    styles={style}
                                    placeholder="Pilih Buku..."
                                />
                                {errors.book_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.book_id}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="mt-2 rounded-md py-2 px-5 bg-blue-500 text-white outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                            >
                                Simpan
                            </button>
                        </form>
                    </div>
                </Card>
            </div>
        </Authenticated>
    );
};

export default LoanCreate;
