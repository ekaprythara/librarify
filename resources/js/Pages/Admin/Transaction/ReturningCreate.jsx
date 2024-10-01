import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { DataTableMinimal } from "@/Components/DataTableMinimal";
import Checkbox from "@/Components/Checkbox";
import { useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Breadcrumbs } from "@/Components/Breadcrumbs";
import { RETURNING_CREATE_BREADCRUMBS } from "@/constants/breadcrumbs";

const LoanCreate = ({ auth, loans, users }) => {
    const [selectedUser, setSelectedUser] = useState();
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [selectedLoans, setSelectedLoans] = useState([]);
    const [selectedLostLoans, setSelectedLostLoans] = useState([]); // State to track checked rows

    const formattedUsers = users.map((user) => ({
        value: user.id,
        label: user.name,
    }));
    const { data, setData, post, errors, reset } = useForm({
        user_id: "",
        loan_id: [],
        isLost: [],
    });

    useEffect(() => {
        const books = loans.filter((loan) => loan.user_id === selectedUser);

        setSelectedBooks(books);
        setSelectedLoans([]);
        setData("user_id", selectedUser); // For validation only
    }, [selectedUser]);

    useEffect(() => {
        setData("loan_id", selectedLoans);
    }, [selectedLoans]);

    useEffect(() => {
        setData("isLost", selectedLostLoans);
    }, [selectedLostLoans]);

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
                const book = row.original.books;

                return (
                    <div className="flex justify-center items-center">
                        {book.image ? (
                            <img
                                src={`/storage/${book.image}`}
                                alt={book.title}
                                width={150}
                                className="rounded-md"
                            />
                        ) : (
                            <img
                                src="https://placehold.co/150x225"
                                alt={book.title}
                                width={150}
                                className="rounded-md"
                            />
                        )}
                    </div>
                );
            },
        },
        {
            accessorFn: (row) => row.books.isbn,
            header: "ISBN",
        },
        {
            accessorFn: (row) => row.books.title,
            header: "Judul",
        },
        {
            accessorFn: (row) => row.loan_date,
            header: "Tanggal Pinjam",
        },
        {
            accessorFn: (row) => row.due_date,
            header: "Jatuh Tempo",
        },
        {
            id: "lost-col",
            header: "Hilang",
            cell: ({ row }) => {
                return (
                    <div className="flex justify-center items-center">
                        <Checkbox
                            checked={selectedLostLoans.includes(
                                row.original.id
                            )}
                            disabled={!selectedLoans.includes(row.original.id)}
                            onChange={() => {
                                if (
                                    selectedLostLoans.includes(row.original.id)
                                ) {
                                    // Remove the loan ID from the selectedLostLoans array
                                    setSelectedLostLoans(
                                        selectedLostLoans.filter(
                                            (id) => id !== row.original.id
                                        )
                                    );
                                } else {
                                    // Add the loan ID to the selectedLostLoans array
                                    setSelectedLostLoans([
                                        ...selectedLostLoans,
                                        row.original.id,
                                    ]);
                                }
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("returning.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <Authenticated auth={auth} header="Tambah">
            <Head title="Tambah Pengembalian" />

            <div className="space-y-10 mt-5">
                <Breadcrumbs data={RETURNING_CREATE_BREADCRUMBS} />

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
                                    onChange={(selectedOptions) =>
                                        setSelectedUser(selectedOptions.value)
                                    }
                                    styles={style}
                                    placeholder="Pilih Anggota..."
                                />
                            </label>
                            {!selectedUser && (
                                <p className="text-sm text-red-600">
                                    {errors.user_id}
                                </p>
                            )}
                        </div>

                        <DataTableMinimal
                            data={selectedBooks}
                            columns={columns}
                            setSelected={setSelectedLoans}
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
