import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <>
            <div className="relative h-16 bg-[#222]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-full justify-between items-center">
                    <h1 className="text-2xl font-semibold text-white">
                        <Link href="/">Perpustakaan</Link>
                    </h1>
                    <div className="flex gap-5">
                        <Link
                            href={route("search-book")}
                            className="text-white text-lg"
                        >
                            Cari Buku
                        </Link>
                        <Link
                            href={route("login")}
                            className="text-white text-lg"
                        >
                            Masuk
                        </Link>
                    </div>
                </div>
            </div>
            <div className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 bg-[#EEF7FF] pb-20">
                {children}
            </div>
        </>
    );
}
