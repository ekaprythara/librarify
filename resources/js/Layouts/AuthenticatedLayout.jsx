import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/Components/Navbar";

export default function Authenticated({ auth, header, children }) {
    return (
        <div className="relative">
            <Navbar auth={auth} />

            <div className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 -z-10">
                <ToastContainer />
                {header && (
                    <h2 className="text-3xl font-semibold text-gray-700">
                        {header}
                    </h2>
                )}
                <main>{children}</main>
            </div>
        </div>
    );
}
