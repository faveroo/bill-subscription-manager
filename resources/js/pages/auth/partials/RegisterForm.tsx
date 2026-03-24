import { useForm, Link } from "@inertiajs/react";

export default function RegisterForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/register');
    }

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
                placeholder="Senha"
                className="bg-zinc-800 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-stone-500 transition-colors"
            />

            <button
                type="submit"
                disabled={processing}
                className="bg-stone-600 text-white font-medium px-4 py-3 mt-2 rounded-md hover:bg-stone-500 transition-colors w-full"
            >
                Cadastrar
            </button>

            {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}

            <div className="mt-4 text-center">
                <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    Já possui conta? Faça login
                </Link>
            </div>
        </form>
    );
}
