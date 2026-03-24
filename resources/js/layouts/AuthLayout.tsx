import { PropsWithChildren } from "react";
import LoginForm from "../pages/auth/partials/LoginForm";
import RegisterForm from "../pages/auth/partials/RegisterForm";

export default function AuthLayout({ mode, children }: PropsWithChildren<{ mode: 'login' | 'register' }>) {
    const isLogin = mode === 'login';

    return (
        <div className="flex h-screen items-center justify-center bg-black overflow-hidden relative">
            <div className="relative flex w-full max-w-4xl min-h-[550px] bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl">

                {/* The sliding panel that covers one side */}
                <div
                    className={`absolute top-0 left-0 w-1/2 h-full bg-zinc-800 transition-transform duration-700 ease-in-out z-20 flex flex-col items-center justify-center ${isLogin ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <h1 className="text-5xl font-bold text-white transition-opacity duration-300 z-30">
                        {isLogin ? 'Bem-vindo' : 'Junte-se a nós'}
                    </h1>
                    <p className="text-zinc-400 mt-4 text-center max-w-xs transition-opacity duration-300 z-30">
                        {isLogin
                            ? 'Acesse sua conta para continuar gerenciando suas assinaturas.'
                            : 'Crie sua conta e comece a controlar seus gastos hoje mesmo.'}
                    </p>

                    {/* Decorative abstract shapes */}
                    <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-stone-600 opacity-20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-zinc-600 opacity-20 rounded-full blur-3xl"></div>
                </div>

                {/* Forms Container */}
                <div className="flex w-full h-full z-10 relative">

                    {/* Left side: Register Form */}
                    <div
                        className={`w-1/2 p-12 flex flex-col justify-center transition-all duration-700 ease-in-out ${isLogin
                                ? 'opacity-0 translate-x-12 pointer-events-none'
                                : 'opacity-100 translate-x-0 delay-150'
                            }`}
                    >
                        <RegisterForm />
                    </div>

                    {/* Right side: Login Form */}
                    <div
                        className={`w-1/2 p-12 flex flex-col justify-center transition-all duration-700 ease-in-out ${isLogin
                                ? 'opacity-100 translate-x-0 delay-150'
                                : 'opacity-0 -translate-x-12 pointer-events-none'
                            }`}
                    >
                        <LoginForm />
                    </div>

                </div>
            </div>
            {/* The actual page content, just Head tags usually */}
            {children}
        </div>
    );
}
