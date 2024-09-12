import { Link } from "@inertiajs/react";
import React from "react";

const Navbar = ({ auth }) => {
    return (
        <div className="navbar sticky top-0 z-50 bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link
                                href={route("member.index")}
                                className="text-base"
                            >
                                Anggota
                            </Link>
                        </li>
                        <li>
                            <span className="text-base">Buku</span>
                            <ul className="p-2">
                                <li>
                                    <Link
                                        href={route("book.index")}
                                        className="text-sm"
                                    >
                                        Buku
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("category.index")}
                                        className="text-sm"
                                    >
                                        Kategori
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("author.index")}
                                        className="text-sm"
                                    >
                                        Pengarang
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("publisher.index")}
                                        className="text-sm"
                                    >
                                        Penerbit
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <span className="text-base">Transaksi</span>
                            <ul className="p-2">
                                <li>
                                    <Link
                                        href={route("loan.index")}
                                        className="text-sm"
                                    >
                                        Peminjaman
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("returning.index")}
                                        className="text-sm"
                                    >
                                        Pengembalian
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <span className="text-base">Laporan</span>
                            <ul className="p-2">
                                <li>
                                    <Link href="#" className="text-sm">
                                        Peminjaman
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-sm">
                                        Pengembalian
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <Link
                    href={route("dashboard")}
                    className="btn btn-ghost text-xl"
                >
                    Librarify
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link
                            href={route("member.index")}
                            className="text-base"
                        >
                            Anggota
                        </Link>
                    </li>
                    <li>
                        <details>
                            <summary className="text-base">Buku</summary>
                            <ul className="p-2">
                                <li>
                                    <Link
                                        href={route("book.index")}
                                        className="text-base"
                                    >
                                        Buku
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("category.index")}
                                        className="text-base"
                                    >
                                        Kategori
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("author.index")}
                                        className="text-base"
                                    >
                                        Pengarang
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("publisher.index")}
                                        className="text-base"
                                    >
                                        Penerbit
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary className="text-base">Transaksi</summary>
                            <ul className="p-2">
                                <li>
                                    <Link
                                        href={route("loan.index")}
                                        className="text-base"
                                    >
                                        Peminjaman
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("returning.index")}
                                        className="text-base"
                                    >
                                        Pengembalian
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary className="text-base">Laporan</summary>
                            <ul className="p-2">
                                <li>
                                    <Link href="#" className="text-base">
                                        Peminjaman
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-base">
                                        Pengembalian
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            {auth.user.image ? (
                                <img
                                    src={`/storage/${auth.user.image}`}
                                    alt={`${auth.user.name} Profile Image`}
                                />
                            ) : (
                                <img
                                    src="https://placehold.co/70"
                                    alt={`${auth.user.name} Profile Image`}
                                />
                            )}
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link href={route("profile.edit")}>
                                <span className="text-base">Profil</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={route("setting.edit")}>
                                <span className="text-base">Pengaturan</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route("logout")}
                                as="button"
                                method="post"
                            >
                                <p className="text-base">Logout</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
