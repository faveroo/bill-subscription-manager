import { Head } from "@inertiajs/react";
import AuthLayout from "../../layouts/AuthLayout";
import { ReactNode } from "react";

export default function Login() {
    return <Head title="Login" />;
}

Login.layout = (page: ReactNode) => <AuthLayout mode="login">{page}</AuthLayout>;