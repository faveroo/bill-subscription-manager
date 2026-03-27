function startOfDay(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function parseDateOnly(value?: string | null) {
    if (!value) {
        return null;
    }

    const parsed = new Date(`${value}T00:00:00`);

    if (Number.isNaN(parsed.getTime())) {
        return null;
    }

    return startOfDay(parsed);
}

