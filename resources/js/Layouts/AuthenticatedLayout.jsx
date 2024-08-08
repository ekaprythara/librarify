import { useState } from "react";
import { Link } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import logo from "../../../public/images/logo/librarify.png";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import profileImg from "../../../public/images/profile.jpg";

export default function Authenticated({ auth, children }) {
    return (
        <>
            <div className="relative h-20 bg-blue-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-full justify-between items-center">
                    <div className="flex justify-center items-center gap-10">
                        <h1 className="text-2xl font-semibold text-white">
                            <Link
                                href="/dashboard"
                                className="flex justify-center items-center"
                            >
                                <img
                                    src={logo}
                                    alt="Librarify Logo"
                                    width={50}
                                    height={50}
                                />
                            </Link>
                        </h1>
                        <div className="flex gap-5">
                            <Link
                                href={route("dashboard")}
                                className="text-white text-base"
                            >
                                Dashboard
                            </Link>
                            {auth.isAdmin && (
                                <>
                                    {auth.isAdmin && (
                                        <>
                                            <Link
                                                href={route("role")}
                                                className="text-white text-base"
                                            >
                                                Role
                                            </Link>
                                            <Link
                                                href={route("member")}
                                                className="text-white text-base"
                                            >
                                                Anggota
                                            </Link>
                                        </>
                                    )}
                                    <Popover>
                                        <PopoverButton className="block text-base text-white focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
                                            <div className="flex items-center gap-2">
                                                <span>Buku</span>
                                                <span>
                                                    <FiChevronDown />
                                                </span>
                                            </div>
                                        </PopoverButton>
                                        <PopoverPanel
                                            transition
                                            anchor="bottom"
                                            className="divide-y divide-white/5 shadow-lg shadow-slate-800/50 rounded-lg mt-5 bg-[#EEF7FF] text-black transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                                        >
                                            <div className="p-3">
                                                {auth.isAdmin && (
                                                    <>
                                                        <Link
                                                            href={route("book")}
                                                            className="block rounded-lg py-2 px-3 transition hover:bg-gray-900/5"
                                                        >
                                                            <p className="text-gray-800 text-base">
                                                                Buku
                                                            </p>
                                                            <p className="text-gray-800/50 text-base">
                                                                Kelola data buku
                                                            </p>
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "category"
                                                            )}
                                                            className="block rounded-lg py-2 px-3 transition hover:bg-gray-900/5"
                                                        >
                                                            <p className="text-gray-800 text-base">
                                                                Kategori
                                                            </p>
                                                            <p className="text-gray-800/50 text-base">
                                                                Kelola kategori
                                                            </p>
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "author"
                                                            )}
                                                            className="block rounded-lg py-2 px-3 transition hover:bg-gray-900/5"
                                                        >
                                                            <p className="text-gray-800 text-base">
                                                                Pengarang
                                                            </p>
                                                            <p className="text-gray-800/50 text-base">
                                                                Kelola pengarang
                                                            </p>
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "publisher"
                                                            )}
                                                            className="block rounded-lg py-2 px-3 transition hover:bg-gray-900/5"
                                                        >
                                                            <p className="text-gray-800 text-base">
                                                                Penerbit
                                                            </p>
                                                            <p className="text-gray-800/50 text-base">
                                                                Kelola penerbit
                                                            </p>
                                                        </Link>
                                                    </>
                                                )}
                                            </div>
                                        </PopoverPanel>
                                    </Popover>
                                    <Popover>
                                        <PopoverButton className="block text-base text-white focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
                                            <div className="flex items-center gap-2">
                                                <span>Transaksi</span>
                                                <span>
                                                    <FiChevronDown />
                                                </span>
                                            </div>
                                        </PopoverButton>
                                        <PopoverPanel
                                            transition
                                            anchor="bottom"
                                            className="divide-y divide-white/5 shadow-lg shadow-slate-800/50 rounded-lg mt-5 bg-[#EEF7FF] text-black transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                                        >
                                            <div className="p-3">
                                                <Link
                                                    href={route("loan.index")}
                                                    className="block rounded-lg py-2 px-3 transition hover:bg-gray-900/5"
                                                >
                                                    <p className="text-gray-800 text-base">
                                                        Peminjaman
                                                    </p>
                                                    <p className="text-gray-800/50 text-base">
                                                        Tambahkan data
                                                        peminjaman buku
                                                    </p>
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "returning.index"
                                                    )}
                                                    className="block rounded-lg py-2 px-3 transition hover:bg-gray-900/5"
                                                >
                                                    <p className="text-gray-800 text-base">
                                                        Pengembalian
                                                    </p>
                                                    <p className="text-gray-800/50 text-base">
                                                        Tambahkan data
                                                        pengembalian buku
                                                    </p>
                                                </Link>
                                            </div>
                                        </PopoverPanel>
                                    </Popover>
                                    <Popover>
                                        <PopoverButton className="block text-base text-white focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
                                            <div className="flex items-center gap-2">
                                                <span>Laporan</span>
                                                <span>
                                                    <FiChevronDown />
                                                </span>
                                            </div>
                                        </PopoverButton>
                                        <PopoverPanel
                                            transition
                                            anchor="bottom"
                                            className="divide-y divide-white/5 shadow-lg shadow-slate-800/50 rounded-lg mt-5 bg-[#EEF7FF] text-black transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                                        >
                                            <div className="p-3">
                                                <Link
                                                    href={route("book")}
                                                    className="block rounded-lg py-2 px-3 transition hover:bg-gray-900/5"
                                                >
                                                    <p className="text-gray-800 text-base">
                                                        Buku
                                                    </p>
                                                    <p className="text-gray-800/50 text-base">
                                                        Kelola data buku
                                                    </p>
                                                </Link>
                                                <Link
                                                    href={route("category")}
                                                    className="block rounded-lg py-2 px-3 transition hover:bg-gray-900/5"
                                                >
                                                    <p className="text-gray-800 text-base">
                                                        Kategori
                                                    </p>
                                                    <p className="text-gray-800/50 text-base">
                                                        Kelola kategori
                                                    </p>
                                                </Link>
                                                <Link
                                                    href={route("author")}
                                                    className="block rounded-lg py-2 px-3 transition hover:bg-gray-900/5"
                                                >
                                                    <p className="text-gray-800 text-base">
                                                        Pengarang
                                                    </p>
                                                    <p className="text-gray-800/50 text-base">
                                                        Kelola pengarang
                                                    </p>
                                                </Link>
                                                <Link
                                                    href={route("publisher")}
                                                    className="block rounded-lg py-2 px-3 transition hover:bg-gray-900/5"
                                                >
                                                    <p className="text-gray-800 text-base">
                                                        Penerbit
                                                    </p>
                                                    <p className="text-gray-800/50 text-base">
                                                        Kelola penerbit
                                                    </p>
                                                </Link>
                                            </div>
                                        </PopoverPanel>
                                    </Popover>
                                </>
                            )}
                            {!auth.isAdmin && (
                                <Popover>
                                    <PopoverButton className="block text-base text-white focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
                                        <div className="flex items-center gap-2">
                                            <span>Riwayat</span>
                                            <span>
                                                <FiChevronDown />
                                            </span>
                                        </div>
                                    </PopoverButton>
                                    <PopoverPanel
                                        transition
                                        anchor="bottom"
                                        className="divide-y divide-white/5 shadow-lg shadow-slate-800/50 rounded-lg mt-5 bg-[#EEF7FF] text-black transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                                    >
                                        <div className="p-3">
                                            <Link
                                                href={route("book")}
                                                className="block rounded-lg py-2 px-3 transition hover:bg-gray-900/5"
                                            >
                                                <p className="text-gray-800 text-base">
                                                    Peminjaman
                                                </p>
                                                <p className="text-gray-800/50 text-base">
                                                    Lihat riwayat peminjaman
                                                    buku
                                                </p>
                                            </Link>
                                            <Link
                                                href={route("category")}
                                                className="block rounded-lg py-2 px-3 transition hover:bg-gray-900/5"
                                            >
                                                <p className="text-gray-800 text-base">
                                                    Kategori
                                                </p>
                                                <p className="text-gray-800/50 text-base">
                                                    Lihat riwayat pengembalian
                                                    buku buku
                                                </p>
                                            </Link>
                                        </div>
                                    </PopoverPanel>
                                </Popover>
                            )}
                        </div>
                    </div>
                    <div className="sm:flex sm:items-center sm:ms-6 flex justify-center items-center gap-3">
                        <img
                            src={profileImg}
                            alt="Profile Image"
                            width={50}
                            height={50}
                            className="bg-white rounded-full bg-cover"
                        />
                        <Popover>
                            <PopoverButton className="block text-base text-white focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
                                <div className="flex items-center gap-2">
                                    <span>{`@${auth.user.username}`}</span>
                                    <span>
                                        <FiChevronDown />
                                    </span>
                                </div>
                            </PopoverButton>
                            <PopoverPanel
                                transition
                                anchor="bottom"
                                className="divide-y divide-white/5 shadow-lg shadow-slate-800/50 rounded-lg mt-5 bg-[#EEF7FF] text-black transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                            >
                                <div className="p-3">
                                    <Link
                                        href={route("profile.edit")}
                                        className="block rounded-lg py-2 px-3 transition hover:bg-gray-900/5"
                                    >
                                        <p className="text-gray-800 text-base">
                                            Profil
                                        </p>
                                    </Link>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        className="block rounded-lg py-2 px-3 transition hover:bg-gray-900/5"
                                    >
                                        <p className="text-gray-800 text-base">
                                            Logout
                                        </p>
                                    </Link>
                                </div>
                            </PopoverPanel>
                        </Popover>
                    </div>
                </div>
            </div>
            <div className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 bg-[#EEF7FF] pb-20">
                {children}
            </div>
        </>
    );
}
