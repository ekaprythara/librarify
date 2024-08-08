import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Select from "react-select";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { GoChevronRight } from "react-icons/go";
import makeAnimated from "react-select/animated";
import Switch from "react-switch";

const BookEdit = ({ auth, book, categories, authors, publishers }) => {
    const [isAvailable, setIsAvailable] = useState(!!book.status);

    const formattedSelectedCategories = book.categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const [selectedCategories, setSelectedCategories] = useState(
        formattedSelectedCategories
    );

    const formattedCategories = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const formattedSelectedAuthors = book.authors.map((author) => ({
        value: author.id,
        label: author.name,
    }));

    const [selectedAuthors, setSelectedAuthors] = useState(
        formattedSelectedAuthors
    );

    const formattedAuthors = authors.map((author) => ({
        value: author.id,
        label: author.name,
    }));

    const style = {
        control: (base) => ({
            ...base,
            "input[type='text']:focus": { boxShadow: "none" },
        }),
    };

    const { data, setData, post, errors, reset } = useForm({
        _method: "patch",
        image: book.image,
        isbn: book.isbn,
        title: book.title,
        category_id: book.categories.map((category) => category.id),
        author_id: book.authors.map((author) => author.id),
        publisher_id: book.publisher_id,
        publish_year: book.publish_year,
        pages: book.pages,
        language: book.language,
        description: book.description,
        remaining_stock: book.remaining_stock,
        status: book.status,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(`/buku/${book.id}/edit`, {
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleSelectedCategoriesChange = (selectedOptions) => {
        setSelectedCategories(selectedOptions);

        setData(
            "category_id",
            selectedOptions.map((option) => option.value)
        );
    };

    const handleSelectedAuthorsChange = (selectedOptions) => {
        setSelectedAuthors(selectedOptions);

        setData(
            "author_id",
            selectedOptions.map((option) => option.value)
        );
    };

    const handleStatusChange = (checked) => {
        setIsAvailable(!isAvailable);
        setData("status", checked);
    };

    const handleFileChange = (event) => {
        const image = document.querySelector("#image");
        const imagePreview = document.querySelector("#image-preview");

        if (!imagePreview.src) {
            imagePreview.classList.remove("hidden");
            imagePreview.classList.add("block");
        }

        const oFReader = new FileReader();
        oFReader.readAsDataURL(image.files[0]);
        oFReader.onload = function (oFREvent) {
            imagePreview.src = oFREvent.target.result;
        };

        setData("image", event.target.files[0]);
    };
    return (
        <Authenticated auth={auth}>
            <Head title="Edit Buku" />
            <div className="space-y-10">
                <h2 className="text-3xl font-semibold text-gray-700">
                    Edit Buku
                </h2>
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
                            href={route("book")}
                            className="hover:text-blue-600 transition-colors duration-300"
                        >
                            Buku
                        </Link>
                    </span>
                    <span>
                        <GoChevronRight size={20} />
                    </span>
                    <span>
                        <Link
                            href={route("book.show", book.id)}
                            className="hover:text-blue-600 transition-colors duration-300"
                        >
                            Detail Buku
                        </Link>
                    </span>
                    <span>
                        <GoChevronRight size={20} />
                    </span>
                    <span className="text-blue-600">Edit Buku</span>
                </div>
                <Card>
                    <div className="max-w-xl">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="image"
                                    className="text-sm font-medium text-gray-800"
                                >
                                    Sampul Buku
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
                                {book.image ? (
                                    <img
                                        id="image-preview"
                                        src={`/storage/${book.image}`}
                                        className="block mb-5"
                                        width="200"
                                        height="300"
                                    />
                                ) : (
                                    <img
                                        id="image-preview"
                                        className="hidden mb-5"
                                        width="200"
                                        height="300"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="isbn"
                                    className="text-sm font-medium text-gray-800"
                                >
                                    ISBN
                                </label>
                                <input
                                    id="isbn"
                                    type="text"
                                    value={data.isbn}
                                    onChange={(e) =>
                                        setData("isbn", e.target.value)
                                    }
                                    placeholder="Contoh: 9786233469319"
                                    className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                />
                                {errors.isbn && (
                                    <p className="text-sm text-red-600">
                                        {errors.isbn}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="title"
                                    className="text-sm font-medium text-gray-800"
                                >
                                    Judul
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    placeholder="Contoh: 9786233469319"
                                    className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-600">
                                        {errors.title}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label
                                    htmlFor="category_id"
                                    className="text-sm font-medium text-gray-800"
                                >
                                    Pilih Kategori:
                                </label>
                                <Select
                                    id="category_id"
                                    options={formattedCategories}
                                    value={selectedCategories}
                                    onChange={handleSelectedCategoriesChange}
                                    components={makeAnimated()}
                                    closeMenuOnSelect={false}
                                    isMulti
                                    styles={style}
                                    placeholder="Pilih Kategori..."
                                />
                                {errors.category_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.category_id}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label
                                    htmlFor="author_id"
                                    className="text-sm font-medium text-gray-800"
                                >
                                    Pilih Penulis:
                                </label>
                                <Select
                                    id="author_id"
                                    options={formattedAuthors}
                                    value={selectedAuthors}
                                    onChange={handleSelectedAuthorsChange}
                                    components={makeAnimated()}
                                    closeMenuOnSelect={false}
                                    isMulti
                                    styles={style}
                                    placeholder="Pilih Kategori..."
                                />
                                {errors.author_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.author_id}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label
                                    htmlFor="publisher_id"
                                    className="text-sm font-medium text-gray-800"
                                >
                                    Pilih Penerbit:
                                </label>
                                <select
                                    id="publisher_id"
                                    className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                    onChange={(e) =>
                                        setData("publisher_id", e.target.value)
                                    }
                                >
                                    {publishers.map((publisher) => (
                                        <option
                                            key={publisher.id}
                                            value={publisher.id}
                                        >
                                            {publisher.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.publisher_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.publisher_id}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="publish_year"
                                    className="text-sm font-medium text-gray-800"
                                >
                                    Tahun Terbit
                                </label>
                                <input
                                    id="publish_year"
                                    type="text"
                                    value={data.publish_year}
                                    onChange={(e) =>
                                        setData("publish_year", e.target.value)
                                    }
                                    placeholder="Contoh: 9786233469319"
                                    className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                />
                                {errors.publish_year && (
                                    <p className="text-sm text-red-600">
                                        {errors.publish_year}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="pages"
                                    className="text-sm font-medium text-gray-800"
                                >
                                    Jumlah Halaman
                                </label>
                                <input
                                    id="pages"
                                    type="text"
                                    value={data.pages}
                                    onChange={(e) =>
                                        setData("pages", e.target.value)
                                    }
                                    placeholder="Contoh: 9786233469319"
                                    className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                />
                                {errors.pages && (
                                    <p className="text-sm text-red-600">
                                        {errors.pages}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="language"
                                    className="text-sm font-medium text-gray-800"
                                >
                                    Bahasa
                                </label>
                                <input
                                    id="language"
                                    type="text"
                                    value={data.language}
                                    onChange={(e) =>
                                        setData("language", e.target.value)
                                    }
                                    placeholder="Contoh: 9786233469319"
                                    className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                />
                                {errors.language && (
                                    <p className="text-sm text-red-600">
                                        {errors.language}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="description"
                                    className="text-sm font-medium text-gray-800"
                                >
                                    Deskripsi
                                </label>
                                <textarea
                                    id="description"
                                    type="text"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    rows={5}
                                    placeholder="Contoh: Lebih dari 2000 tahun lalu, sebuah..."
                                    className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                ></textarea>
                                {errors.description && (
                                    <p className="text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="quantity"
                                    className="text-sm font-medium text-gray-800"
                                >
                                    Jumlah
                                </label>
                                <input
                                    id="remaining_stock"
                                    type="number"
                                    value={data.remaining_stock}
                                    onChange={(e) =>
                                        setData(
                                            "remaining_stock",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Contoh: 20, 25, ..."
                                    className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                                />
                                {errors.remaining_stock && (
                                    <p className="text-sm text-red-600">
                                        {errors.remaining_stock}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="status"
                                    className="text-sm font-medium text-gray-800"
                                >
                                    Status
                                </label>
                                <Switch
                                    onChange={handleStatusChange}
                                    checked={isAvailable}
                                />
                                {errors.status && (
                                    <p className="text-sm text-red-600">
                                        {errors.status}
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

export default BookEdit;
