import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status }) {
    const { data, setData, post, errors, reset } = useForm({
        email: "",
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Masuk" />
            <div className="flex flex-col items-center gap-5">
                {status && (
                    <div className="p-5 rounded-lg mb-10 shadow-lg bg-[#FCF8F3] w-full max-w-lg">
                        <p className="text-lg">{status}!</p>
                    </div>
                )}
                <h2 className="text-3xl font-semibold text-gray-700">MASUK</h2>
                <div className="p-10 rounded-lg shadow-lg bg-[#FCF8F3] w-full max-w-lg">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-2"
                    >
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-gray-800">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-gray-800">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="rounded-lg border-gray-300 outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="mt-2 rounded-md py-2 px-5 bg-blue-500 text-white outline-none focus:ring-4 focus:ring-blue-200/95 duration-100"
                        >
                            Masuk
                        </button>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
