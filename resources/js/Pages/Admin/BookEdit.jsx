import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Select from "react-select";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { GoChevronRight } from "react-icons/go";
import makeAnimated from "react-select/animated";
import { useEffect } from "react";
import { Breadcrumbs } from "@/Components/Breadcrumbs";
import { BOOK_EDIT_BREADCRUMBS } from "@/constants/breadcrumbs";

const BookEdit = ({ auth, book, categories, authors, publishers }) => {
    // Convert to boolean value
    const [isAvailable, setIsAvailable] = useState(!!book.status);

    const [imageSrc, setImageSrc] = useState(null);
    const [showImage, setShowImage] = useState(false);

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

    const formattedPublishers = publishers.map((publisher) => ({
        value: publisher.id,
        label: publisher.name,
    }));

    const [selectedPublisher, setSelectedPublisher] = useState(
        formattedPublishers.find((option) => option.value === book.publisher_id)
    );

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

    const handleSelectedPublisherChange = (selectedOptions) => {
        setSelectedPublisher(selectedOptions);

        setData("publisher_id", selectedOptions.value);
    };

    const handleStatusChange = (e) => {
        setIsAvailable(!isAvailable);
        setData("status", e.target.checked);
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

    useEffect(() => {
        if (book.image) {
            setShowImage(true);
        }
    }, []);

    return (
        <Authenticated auth={auth} header="Edit Buku">
            <Head title="Edit Buku" />
            <div className="space-y-10 mt-5">
                <Breadcrumbs data={BOOK_EDIT_BREADCRUMBS} />

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
                                            Upload Foto Buku (Direkomendasikan
                                            Rasio 3:4)
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
                            </div>

                            {/* Show the image */}
                            {showImage && (
                                <img
                                    src={
                                        imageSrc
                                            ? imageSrc
                                            : `/storage/${book.image}`
                                    }
                                    alt="Image Preview"
                                    width="200"
                                    className="rounded-lg"
                                />
                            )}

                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full max-w-xl">
                                    <div className="label">
                                        <span className="label-text">ISBN</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={data.isbn}
                                        onChange={(e) =>
                                            setData("isbn", e.target.value)
                                        }
                                        placeholder="Contoh: 9786233469319"
                                        className="input input-sm md:input-md input-bordered w-full max-w-xl"
                                    />
                                </label>
                                {errors.isbn && (
                                    <p className="text-sm text-red-600">
                                        {errors.isbn}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full max-w-xl">
                                    <div className="label">
                                        <span className="label-text">
                                            Judul
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        placeholder="Contoh: Filosofi Teras"
                                        className="input input-sm md:input-md input-bordered w-full max-w-xl"
                                    />
                                </label>
                                {errors.title && (
                                    <p className="text-sm text-red-600">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full max-w-xl">
                                    <div className="label">
                                        <span className="label-text">
                                            Pilih Kategori:
                                        </span>
                                    </div>
                                    <Select
                                        options={formattedCategories}
                                        components={makeAnimated()}
                                        onChange={
                                            handleSelectedCategoriesChange
                                        }
                                        value={selectedCategories}
                                        closeMenuOnSelect={false}
                                        isMulti
                                        styles={style}
                                        placeholder="Pilih Kategori..."
                                    />
                                </label>
                                {errors.category_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.category_id}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full max-w-xl">
                                    <div className="label">
                                        <span className="label-text">
                                            Pilih Pengarang:
                                        </span>
                                    </div>
                                    <Select
                                        options={formattedAuthors}
                                        components={makeAnimated()}
                                        onChange={handleSelectedAuthorsChange}
                                        value={selectedAuthors}
                                        closeMenuOnSelect={false}
                                        isMulti
                                        styles={style}
                                        placeholder="Pilih Pengarang..."
                                    />
                                </label>
                                {errors.author_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.author_id}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full max-w-xl">
                                    <div className="label">
                                        <span className="label-text">
                                            Pilih Penerbit:
                                        </span>
                                    </div>
                                    <Select
                                        options={formattedPublishers}
                                        components={makeAnimated()}
                                        onChange={handleSelectedPublisherChange}
                                        value={selectedPublisher}
                                        styles={style}
                                        placeholder="Pilih Penerbit..."
                                    />
                                </label>
                                {errors.publisher_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.publisher_id}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full max-w-xl">
                                    <div className="label">
                                        <span className="label-text">
                                            Tahun Terbit
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        value={data.publish_year}
                                        onChange={(e) => {
                                            setData(
                                                "publish_year",
                                                e.target.value
                                            );
                                        }}
                                        placeholder="Contoh: 2020"
                                        className="input input-sm md:input-md input-bordered w-full max-w-xl"
                                    />
                                </label>
                                {errors.publish_year && (
                                    <p className="text-sm text-red-600">
                                        {errors.publish_year}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full max-w-xl">
                                    <div className="label">
                                        <span className="label-text">
                                            Jumlah Halaman
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        value={data.pages}
                                        onChange={(e) =>
                                            setData("pages", e.target.value)
                                        }
                                        placeholder="Contoh: 50"
                                        className="input input-sm md:input-md input-bordered w-full max-w-xl"
                                    />
                                </label>
                                {errors.pages && (
                                    <p className="text-sm text-red-600">
                                        {errors.pages}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full max-w-xl">
                                    <div className="label">
                                        <span className="label-text">
                                            Bahasa
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        value={data.language}
                                        onChange={(e) =>
                                            setData("language", e.target.value)
                                        }
                                        placeholder="Contoh: Bahasa Indonesia"
                                        className="input input-sm md:input-md input-bordered w-full max-w-xl"
                                    />
                                </label>
                                {errors.language && (
                                    <p className="text-sm text-red-600">
                                        {errors.language}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full max-w-xl">
                                    <div className="label">
                                        <span className="label-text">
                                            Deskripsi
                                        </span>
                                    </div>
                                    <textarea
                                        id="description"
                                        type="text"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        rows={8}
                                        placeholder="Contoh: Pada tahun 250 sebelum masehi, sebuah..."
                                        className="textarea textarea-bordered"
                                    ></textarea>
                                </label>
                                {errors.description && (
                                    <p className="text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full max-w-xl">
                                    <div className="label">
                                        <span className="label-text">
                                            Jumlah
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        value={data.remaining_stock}
                                        onChange={(e) =>
                                            setData(
                                                "remaining_stock",
                                                e.target.value
                                            )
                                        }
                                        min="1"
                                        placeholder="Contoh: 20, 25, ..."
                                        className="input input-sm md:input-md input-bordered w-full max-w-xl"
                                    />
                                </label>
                                {errors.remaining_stock && (
                                    <p className="text-sm text-red-600">
                                        {errors.remaining_stock}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="form-control w-full max-w-xl">
                                    <div className="label">
                                        <span className="label-text">
                                            Status
                                        </span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="toggle"
                                        onChange={handleStatusChange}
                                        checked={isAvailable}
                                    />
                                </label>
                                {errors.status && (
                                    <p className="text-sm text-red-600">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-info btn-sm md:btn-md w-fit mt-2"
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
