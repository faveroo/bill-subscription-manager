import { normalizeSubscriptionName } from "@/icons/subscriptionIcons";

const urls: Record<string, string> = {
    "Netflix": "https://www.netflix.com/",
    "Spotify": "https://www.spotify.com/",
    "Amazon Prime": "https://www.amazon.com.br/prime",
    "Disney+": "https://www.disneyplus.com/",
    "HBO Max": "https://www.hbomax.com/",
    "YouTube Premium": "https://www.youtube.com/premium",
    "iCloud+": "https://www.apple.com/icloud/",
    "Google One": "https://one.google.com/",
    "Microsoft 365": "https://www.microsoft.com/microsoft-365",
    "Adobe Creative Cloud": "https://www.adobe.com/creativecloud",
    "Dropbox": "https://www.dropbox.com/",
    "Notion": "https://www.notion.so/",
    "GitHub": "https://github.com/settings/copilot/features",
    "LinkedIn Premium": "https://www.linkedin.com/premium",
    "MasterClass": "https://www.masterclass.com/",
    "Coursera": "https://www.coursera.org/",
    "Udemy": "https://www.udemy.com/",
    "Xbox Game Pass": "https://www.xbox.com/pt-BR/xbox-game-pass",
    "PlayStation Plus": "https://www.playstation.com/pt-br/ps-plus/",
    "Nintendo Switch Online": "https://www.nintendo.com/pt_BR/switch/online/",
    "Amazon Music": "https://www.amazon.com.br/music",
    "Apple Music": "https://www.apple.com/apple-music/",
    "Deezer": "https://www.deezer.com/",
    "Tidal": "https://tidal.com/",
    "Paramount+": "https://www.paramountplus.com/",
    "Star+": "https://www.starplus.com/",
    "DAZN": "https://www.dazn.com/",
    "GloboPlay": "https://globoplay.globo.com/",
    "Telecine": "https://www.telecine.com.br/",
    "Looke": "https://www.looke.com.br/",
    "Apple TV+": "https://www.apple.com/br/apple-tv-plus/",
    "Amazon Prime Video": "https://www.primevideo.com/",
    "Discord": "https://discord.com/",
}

const subscriptionUrlEntries = Object.entries(urls).sort(
    ([left], [right]) => right.length - left.length,
);

export function getSubsUrl(subscriptionName: string) {
    if (!subscriptionName) return '';
    const normalizedName = normalizeSubscriptionName(subscriptionName);
    for (const [key, url] of subscriptionUrlEntries) {
        if (normalizedName.includes(key.toLowerCase())) {
            return url;
        }
    }
    return null;
}
