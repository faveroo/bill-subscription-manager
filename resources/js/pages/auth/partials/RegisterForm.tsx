import { useForm, Link } from "@inertiajs/react";
import { useEffect, useMemo } from "react";

export default function RegisterForm() {
    const { data, setData, post, processing, errors, hasErrors, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const errorKey = useMemo(() => JSON.stringify(errors), [errors]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/register');
    }

    useEffect(() => {
        if (!hasErrors) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            clearErrors();
        }, 8000);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [hasErrors, errorKey, clearErrors]);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <h2 className="text-3xl font-bold text-white mb-2 text-center md:text-left">Criar Conta</h2>
            
            <input
                type="text"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                placeholder="Nome"
                className={`bg-zinc-800 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-stone-500 transition-colors ${errors.name ? 'ring-2 ring-red-500' : ''}`}
            />
            <input
                type="email"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                placeholder="Email"
                className={`bg-zinc-800 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-stone-500 transition-colors ${errors.email ? 'ring-2 ring-red-500' : ''}`}
            />

            <input
                type="password"
                value={data.password}
                onChange={e => setData('password', e.target.value)}
                placeholder="Password"
                className={`bg-zinc-800 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-stone-500 transition-colors ${errors.password ? 'ring-2 ring-red-500' : ''}`}
            />

            <input
                type="password"
                value={data.password_confirmation}
                onChange={e => setData('password_confirmation', e.target.value)}
                placeholder="Confirm Password"
                className={`bg-zinc-800 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-stone-500 transition-colors ${errors.password_confirmation ? 'ring-2 ring-red-500' : ''}`}
            />

            <button
                type="submit"
                disabled={processing}
                className="bg-stone-600 text-white font-medium px-4 py-3 mt-2 rounded-md hover:bg-stone-500 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Cadastrar
            </button>

            <div className="mt-2">
                {Object.values(errors).length > 0 && (
                    <div className="text-red-500 text-sm mt-1 space-y-1">
                        {Object.values(errors).map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-4 text-center">
                <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    Já possui conta? Faça login
                </Link>
            </div>
        </form>
    );
}
