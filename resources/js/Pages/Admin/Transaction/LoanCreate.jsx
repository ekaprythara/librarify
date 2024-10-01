import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { DataTableMinimal } from "@/Components/DataTableMinimal";
import Checkbox from "@/Components/Checkbox";
import { useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Breadcrumbs } from "@/Components/Breadcrumbs";
import { LOAN_CREATE_BREADCRUMBS } from "@/constants/breadcrumbs";
import { BsFillInfoCircleFill } from "react-icons/bs";

const LoanCreate = ({ auth, books, users, loans }) => {
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [newBooks, setNewBooks] = useState([]);

    const formattedUsers = users.map((user) => ({
        value: user.id,
        label: user.name,
    }));

    // console.log(books);

    const style = {
        control: (base, state) => ({
            ...base,
            minHeight: "2rem",
            paddingLeft: "0.2rem",
            paddingRight: "0.2rem",
            lineHeight: "1.2rem",

            "@media (min-width: 768px)": {
                minHeight: "3rem",
                paddingLeft: "0.4rem",
                paddingRight: "0.4rem",
                lineHeight: "1.4rem",
            },

            fontSize: "0.875rem",
            borderRadius: "0.5rem",
            borderColor: "#d2d4d7",
            "&:hover": {
                borderColor: "#d2d4d7", // Border color on hover
            },
            transition: "none",
            outline: state.isFocused ? "2px solid #d2d4d7" : "none", // Outline when focused
            outlineOffset: "2px",
            boxShadow: "none",
            "input[type='text']:focus": {
                boxShadow: "none",
            },
        }),
        clearIndicator: (base) => ({
            ...base,
            svg: {
                width: 15,
                height: 15,
            },
            "@media (min-width: 768px)": {
                svg: {
                    width: 20,
                    height: 20,
                },
            },
        }),
        dropdownIndicator: (base) => ({
            ...base,
            padding: 4,
            svg: {
                width: 15,
                height: 15,
            },
            "@media (min-width: 768px)": {
                padding: 8,
                svg: {
                    width: 20,
                    height: 20,
                },
            },
        }),
        placeholder: (base) => ({
            ...base,
            fontSize: "0.875rem",
        }),
    };

    useEffect(() => {
        setData("book_id", selectedBooks);
    }, [selectedBooks]);

    const columns = [
        {
            id: "select-col",
            header: ({ table }) => (
                <div className="flex justify-center items-center">
                    <Checkbox
                        checked={table.getIsAllRowsSelected()}
                        indeterminate={table.getIsSomeRowsSelected() ? 1 : 0}
                        onChange={table.getToggleAllRowsSelectedHandler()}
                    />
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center items-center">
                    <Checkbox
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        onChange={row.getToggleSelectedHandler()}
                    />
                </div>
            ),
        },
        {
            header: "Image",
            cell: ({ row }) => {
                const image = row.original.image;
                return (
                    <div className="flex justify-center items-center">
                        {image ? (
                            <img
                                src={`/storage/${image}`}
                                alt={row.original.title}
                                width={150}
                                className="rounded-md"
                            />
                        ) : (
                            <img
                                src="https://placehold.co/150x225"
                                alt={row.original.title}
                                width={150}
                                className="rounded-md"
                            />
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: "isbn",
            header: "ISBN",
        },
        {
            accessorKey: "title",
            header: "Judul",
        },
        {
            accessorFn: (row) => {
                return row.authors.map((author) => author.name).join(", ");
            },
            header: "Penulis",
        },
    ];

    const { data, setData, post, errors, reset } = useForm({
        book_id: [],
        user_id: "",
    });

    const handleOnUserChange = (selectedOptions) => {
        setData("user_id", selectedOptions.value);
        const userId = selectedOptions.value;

        // Get the IDs of books borrowed by the user
        const borrowedBookIds = loans
            .filter((loan) => loan.user_id === userId) // Filter loans for the selected user
            .map((loan) => loan.book_id); // Get the book IDs

        // Filter the complete book list to find books that the user has not borrowed
        const booksNotLoanedByUser = books.filter(
            (book) => !borrowedBookIds.includes(book.id) // Only include books not in borrowed list
        );

        setNewBooks(booksNotLoanedByUser);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("loan.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <Authenticated auth={auth} header="Tambah">
            <Head title="Tambah" />

            <div className="space-y-10 mt-5">
                <Breadcrumbs data={LOAN_CREATE_BREADCRUMBS} />

                <Card>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="flex flex-col gap-1">
                            <label className="form-control w-full max-w-xl">
                                <div className="label">
                                    <span className="label-text">
                                        Pilih Anggota:
                                    </span>
                                </div>
                                <Select
                                    options={formattedUsers}
                                    components={makeAnimated()}
                                    onChange={handleOnUserChange}
                                    styles={style}
                                    placeholder="Pilih Anggota..."
                                />
                            </label>
                            {errors.user_id && (
                                <p className="text-sm text-red-600">
                                    {errors.user_id}
                                </p>
                            )}
                        </div>
                        <p className="flex items-center text-blue-500 gap-2">
                            <BsFillInfoCircleFill size={20} />
                            Buku yang sedang dipinjam dan stok kosong tidak akan
                            terlihat.
                        </p>
                        <DataTableMinimal
                            data={newBooks}
                            columns={columns}
                            setSelected={setSelectedBooks}
                        />

                        <button
                            type="submit"
                            className="btn btn-sm md:btn-md btn-info"
                        >
                            Simpan
                        </button>
                    </form>
                </Card>
            </div>
        </Authenticated>
    );
};

export default LoanCreate;
