import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import UpdateLimitation from "./Partials/UpdateLimitation";
import Card from "@/Components/Card";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function SettingEdit({ auth, limitation }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    return (
        <AuthenticatedLayout auth={auth} header="Pengaturan">
            <Head title="Pengaturan" />

            <div className="space-y-10 mt-5">
                {/* Breadcrumbs */}
                <div className="breadcrumbs flex justify-end items-center text-sm text-gray-700">
                    <ul>
                        <li>
                            <Link href={route("dashboard")}>Dashboard</Link>
                        </li>
                        <li>Pengaturan</li>
                    </ul>
                </div>
                {/* End of Breadcrumbs */}
                <Card>
                    <UpdateLimitation limitation={limitation} />
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
