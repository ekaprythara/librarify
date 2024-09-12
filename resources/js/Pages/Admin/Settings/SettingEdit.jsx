import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import UpdateLimitation from "./Partials/UpdateLimitation";
import Card from "@/Components/Card";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function SettingEdit({ auth, limitation }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    return (
        <AuthenticatedLayout auth={auth} header="Pengaturan">
            <Head title="Pengaturan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <Card>
                        <UpdateLimitation limitation={limitation} />
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
