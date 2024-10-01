import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useRef } from "react";
import { useState } from "react";

export default function Login({ status }) {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);

    const localStorageEmail = localStorage.getItem("email");

    const { data, setData, post, errors, reset } = useForm({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (localStorageEmail) {
            setIsRememberMeChecked(true);
            setData("email", localStorageEmail);
            passwordInputRef.current.focus();
        } else {
            emailInputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onSuccess: () => {
                if (isRememberMeChecked) {
                    localStorage.setItem("email", data.email);
                } else {
                    localStorage.removeItem("email");
                }
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk" />
            <div className="flex flex-col items-center gap-5 w-full">
                {status && (
                    <div className="p-5 rounded-lg mb-10 shadow-lg bg-[#FCF8F3] w-full max-w-lg">
                        <p className="text-lg">{status}!</p>
                    </div>
                )}
                <div className="p-10 rounded-lg shadow-lg bg-[#FCF8F3] w-full max-w-lg">
                    <header>
                        <h3 className="text-2xl font-medium text-gray-900">
                            Login
                        </h3>

                        <p className="mt-1 text-lg text-gray-600">
                            Welcome back, please login to your account.
                        </p>
                    </header>
                    <form onSubmit={handleSubmit} className="space-y-2 mt-5">
                        <div className="flex flex-col gap-1">
                            <label className="form-control w-full max-w-xl">
                                <div className="label">
                                    <span className="label-text">Email</span>
                                </div>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    ref={emailInputRef}
                                    className="input input-sm md:input-md input-bordered w-full max-w-xl"
                                />
                            </label>
                            {errors.email && (
                                <p className="text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="form-control w-full max-w-xl">
                                <div className="label">
                                    <span className="label-text">Password</span>
                                </div>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    ref={passwordInputRef}
                                    className="input input-sm md:input-md input-bordered w-full max-w-xl"
                                />
                            </label>
                            {errors.password && (
                                <p className="text-sm text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer w-fit flex gap-2">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={isRememberMeChecked}
                                    onChange={(e) =>
                                        setIsRememberMeChecked(e.target.checked)
                                    }
                                />
                                <span className="label-text">Remember me</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            Masuk
                        </button>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
