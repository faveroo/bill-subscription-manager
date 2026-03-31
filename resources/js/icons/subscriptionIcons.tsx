import type { JSX } from "react";
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
} from "react-icons/fa";
import { SiNetflix } from "react-icons/si";

function normalizeSubscriptionName(value: string) {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

export const subscriptionIcons: Record<string, JSX.Element> = {
    "youtube premium": <FaYoutube />,
    "youtube music": <FaYoutube />,
    youtube: <FaYoutube />,

    netflix: <SiNetflix />,

    "prime video": <FaAmazon />,
    "amazon prime": <FaAmazon />,
    amazon: <FaAmazon />,

    apple: <FaApple />,
    icloud: <FaApple />,

    google: <FaGoogle />,
    gmail: <FaGoogle />,
    "google drive": <FaGoogle />,

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

export function getSubscriptionIcon(name: string) {
    const normalizedName = normalizeSubscriptionName(name);

    if (!normalizedName) {
        return null;
    }

    const directIcon = subscriptionIcons[normalizedName];

    if (directIcon) {
        return directIcon;
    }

    for (const [key, icon] of subscriptionIconEntries) {
        if (normalizedName.includes(key)) {
            return icon;
        }
    }

    return null;
}
