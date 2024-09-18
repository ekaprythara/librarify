import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head, Link } from "@inertiajs/react";
import Card from "@/Components/Card";
import { Breadcrumbs } from "@/Components/Breadcrumbs";
import { PROFILE_BREADCRUMBS } from "@/constants/breadcrumbs";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout auth={auth} header="Profile">
            <Head title="Profile" />

            <div className="space-y-10 mt-5">
                <Breadcrumbs data={PROFILE_BREADCRUMBS} />
                <Card>
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </Card>

                <Card>
                    <UpdatePasswordForm className="max-w-xl" />
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
