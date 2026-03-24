import { Head } from "@inertiajs/react";
import AuthLayout from "../../layouts/AuthLayout";
import { ReactNode } from "react";

export default function Register() {
    return <Head title="Register" />;
}

Register.layout = (page: ReactNode) => <AuthLayout mode="register">{page}</AuthLayout>;