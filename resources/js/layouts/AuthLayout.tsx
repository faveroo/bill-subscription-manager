import { PropsWithChildren } from "react";
import LoginForm from "../pages/auth/partials/LoginForm";
import RegisterForm from "../pages/auth/partials/RegisterForm";

export default function AuthLayout({
    mode,
    children,
}: PropsWithChildren<{ mode: "login" | "register" }>) {
    const isLogin = mode === "login";

    return (
        <div className="flex min-h-screen items-center justify-center bg-black overflow-hidden relative px-4">
            <div className="relative flex flex-col md:flex-row w-full max-w-4xl min-h-[550px] bg-zinc-900 md:rounded-2xl overflow-hidden shadow-2xl">

                {/* Painel deslizante / Header no mobile */}
                <div
                    className={`
                        absolute md:top-0 md:left-0
                        w-full md:w-1/2
                        h-40 md:h-full
                        bg-zinc-800
                        transition-transform duration-700 ease-in-out
                        z-20 flex flex-col items-center justify-center text-center px-6
                        ${isLogin ? "md:translate-x-0" : "md:translate-x-full"}
                    `}
                >
                    <h1 className="text-3xl md:text-5xl font-bold text-white">
                        {isLogin ? "Bem-vindo" : "Junte-se a nós"}
                    </h1>

                    <p className="text-zinc-400 mt-3 md:mt-4 text-sm md:text-base max-w-xs">
                        {isLogin
                            ? "Acesse sua conta para continuar gerenciando suas assinaturas."
                            : "Crie sua conta e comece a controlar seus gastos hoje mesmo."}
                    </p>

                    {/* Shapes decorativos */}
                    <div className="hidden md:block absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-stone-600 opacity-20 rounded-full blur-3xl"></div>
                    <div className="hidden md:block absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-zinc-600 opacity-20 rounded-full blur-3xl"></div>
                </div>

                {/* Container dos Forms */}
                <div className="flex flex-col md:flex-row w-full h-full z-10 relative">

                    {/* Register */}
                    <div
                        className={`
                            w-full md:w-1/2
                            p-6 md:p-12
                            flex flex-col justify-center
                            transition-all duration-700 ease-in-out
                            ${isLogin
                                ? "hidden md:flex md:opacity-0 md:translate-x-12 md:pointer-events-none"
                                : "opacity-100 translate-x-0"}
                        `}
                    >
                        {/* Espaço extra no mobile por causa do header */}
                        <div className="mt-44 md:mt-0">
                            <RegisterForm />
                        </div>
                    </div>

                    {/* Login */}
                    <div
                        className={`
                            w-full md:w-1/2
                            p-6 md:p-12
                            flex flex-col justify-center
                            transition-all duration-700 ease-in-out
                            ${isLogin
                                ? "opacity-100 translate-x-0"
                                : "hidden md:flex md:opacity-0 md:-translate-x-12 md:pointer-events-none"}
                        `}
                    >
                        <div className="mt-44 md:mt-0">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>

            {/* Head / children */}
            {children}
        </div>
    );
}