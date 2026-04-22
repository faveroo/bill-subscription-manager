import { Link as InertiaLink, InertiaLinkProps } from '@inertiajs/react';

type Props = {
    href: string;
    variant?: 'primary' | 'success' | 'danger' | 'secondary';
    className?: string;
    children: React.ReactNode;
} & Omit<InertiaLinkProps, 'href' | 'className'>;

export function Link({
    href,
    children,
    variant = 'primary',
    className = '',
    ...props
}: Props) {
    const isExternal = href.startsWith('http');

    const base = 'inline-block text-sm rounded border px-4 py-2 text-center text-white transition-colors';

    const variants = {
        primary: "border-zinc-600 hover:bg-neutral-600 hover:border-neutral-600",
        secondary: "border-zinc-500/70 hover:bg-zinc-600",
        success: "border-green-700 hover:bg-green-700",
        danger: "border-red-700 hover:bg-red-700"
    };

    const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`;

    if (isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
            >
                {children}
            </a>
        );
    }

    return (
        <InertiaLink
            href={href}
            className={classes}
            {...props}
        >
            {children}
        </InertiaLink>
    );
}