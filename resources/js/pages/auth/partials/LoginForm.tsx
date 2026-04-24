import { useForm, Link } from "@inertiajs/react";
import { useEffect, useMemo } from "react";

export default function LoginForm() {
    const { data, setData, post, processing, reset, errors, hasErrors, clearErrors } = useForm({
        email: '',
        password: '',
        error: ''
    });

    const errorKey = useMemo(() => JSON.stringify(errors), [errors]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/login', {
            onError: () => {
                reset('password');
            }
        });
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
            <h2 className="text-3xl font-bold text-white mb-2 text-center md:text-left">Acessar Conta</h2>

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
                placeholder="Senha"
                className={`bg-zinc-800 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-stone-500 transition-colors ${errors.password ? 'ring-2 ring-red-500' : ''}`}
            />

            <button
                type="submit"
                disabled={processing}
                className="bg-stone-600 text-white font-medium px-4 py-3 mt-2 rounded-md hover:bg-stone-500 transition-colors w-full"
            >
                Entrar
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



            <div className="text-center">
                <Link href="/register" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    Não possui conta? Cadastre-se
                </Link>
            </div>
        </form>
    );
}
