import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Welcome({ newestGuestName }) {
    const [isWelcome, setIsWelcome] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsWelcome(false);
        }, 5000);
        return () => clearTimeout(timeout);
    }, [isWelcome]);

    const { data, setData, post, errors, reset } = useForm({
        name: "",
        phone_number: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/", {
            onSuccess: () => {
                setIsWelcome(true);
                reset();
            },
        });
    };

    return (
        <Guest>
            <Head title="Buku Tamu" />
            <div className="flex flex-col items-center gap-5">
                {isWelcome && (
                    <div className="p-5 rounded-lg mb-10 shadow-lg bg-[#FCF8F3] w-full max-w-lg">
                        <p className="text-lg">
                            Selamat datang, {newestGuestName}! 👋
                        </p>
                    </div>
                )}
                <h2 className="text-3xl font-semibold text-gray-700">
                    BUKU TAMU
                </h2>
                <div className="p-10 rounded-lg shadow-lg bg-[#FCF8F3] w-full max-w-lg">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-2"
                    >
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="text-gray-800">
                                Nama
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="phone_number"
                                className="text-gray-800"
                            >
                                No. Telepon
                            </label>
                            <input
                                id="phone_number"
                                type="tel"
                                value={data.phone_number}
                                onChange={(e) =>
                                    setData("phone_number", e.target.value)
                                }
                                className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                            />
                            {errors.phone_number && (
                                <p className="text-sm text-red-600">
                                    {errors.phone_number}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="mt-2 rounded-md py-2 px-5 bg-blue-500 text-white outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Guest>
    );
}
