import { cloneElement, isValidElement } from 'react';
import type { JSX, ReactElement } from 'react';
import {
    FaAmazon,
    FaApple,
    FaDiscord,
    FaDropbox,
    FaGithub,
    FaGitlab,
    FaGoogle,
    FaMicrosoft,
    FaPaypal,
    FaSlack,
    FaSpotify,
    FaSteam,
    FaTwitch,
    FaYoutube,
} from 'react-icons/fa';
import { SiNetflix } from 'react-icons/si';

function normalizeSubscriptionName(value: string) {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
}

export const subscriptionIcons: Record<string, JSX.Element> = {
    'youtube premium': <FaYoutube />,
    'youtube music': <FaYoutube />,
    youtube: <FaYoutube />,

    netflix: <SiNetflix />,

    'prime video': <FaAmazon />,
    'amazon prime': <FaAmazon />,
    amazon: <FaAmazon />,

    apple: <FaApple />,
    icloud: <FaApple />,

    google: <FaGoogle />,
    gmail: <FaGoogle />,
    'google drive': <FaGoogle />,

    microsoft: <FaMicrosoft />,
    xbox: <FaMicrosoft />,
    office: <FaMicrosoft />,
    onedrive: <FaMicrosoft />,

    github: <FaGithub />,
    gitlab: <FaGitlab />,

    discord: <FaDiscord />,
    slack: <FaSlack />,
    dropbox: <FaDropbox />,
    spotify: <FaSpotify />,
    paypal: <FaPaypal />,
    twitch: <FaTwitch />,
    steam: <FaSteam />,
};

const subscriptionIconEntries = Object.entries(subscriptionIcons).sort(
    ([left], [right]) => right.length - left.length,
);

export type SubscriptionIconOptions = {
    size?: number | string;
    className?: string;
    title?: string;
};

type IconLikeProps = {
    size?: number | string;
    className?: string;
    title?: string;
    'aria-label'?: string;
    'aria-hidden'?: boolean;
};

function mergeClassNames(left?: string, right?: string) {
    return [left, right].filter(Boolean).join(' ');
}

function applyIconOptions(
    icon: JSX.Element,
    options?: SubscriptionIconOptions,
) {
    if (!options) return icon;
    if (!isValidElement(icon)) return icon;

    const element = icon as ReactElement<IconLikeProps>;

    const ariaProps =
        typeof options.title === 'string' && options.title.trim().length > 0
            ? { 'aria-label': options.title, 'aria-hidden': undefined }
            : { 'aria-label': undefined, 'aria-hidden': true };

    return cloneElement<IconLikeProps>(element, {
        size: options.size,
        className: mergeClassNames(element.props.className, options.className),
        title: options.title,
        ...ariaProps,
    });
}

export function getSubscriptionIcon(
    name: string,
    options?: SubscriptionIconOptions,
) {
    const normalizedName = normalizeSubscriptionName(name);

    if (!normalizedName) {
        return null;
    }

    const directIcon = subscriptionIcons[normalizedName];

    if (directIcon) {
        return applyIconOptions(directIcon, options);
    }

    for (const [key, icon] of subscriptionIconEntries) {
        if (normalizedName.includes(key)) {
            return applyIconOptions(icon, options);
        }
    }

    return null;
}
