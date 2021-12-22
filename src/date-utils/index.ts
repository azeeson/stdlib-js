
const token = /d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g;

const pad = (val: string | number, len = 2): string => String(val).padStart(len, '0');

let i18n = {
    dayNames: [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    monthNames: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
};

const getDayOfWeek = (date: Date) => {
    const dow = date.getDay();
    if (dow === 0) {
        return 7;
    }
    return dow;
};

const getFormatFlags = (date: Date) => {
    const d = () => date.getDate();
    const D = () => date.getDay();
    const m = () => date.getMonth();
    const y = () => date.getFullYear();
    const H = () => date.getHours();
    const M = () => date.getMinutes();
    const s = () => date.getSeconds();
    const L = () => date.getMilliseconds();
    const o = () => date.getTimezoneOffset();
    const N = () => getDayOfWeek(date);

    const flags: Record<string, () => string | number> = {
        d: () => d(),
        dd: () => pad(d()),
        ddd: () => i18n.dayNames[D()],
        dddd: () => i18n.dayNames[D() + 7],
        m: () => m() + 1,
        mm: () => pad(m() + 1),
        mmm: () => i18n.monthNames[m()],
        mmmm: () => i18n.monthNames[m() + 12],
        yy: () => String(y()).slice(2),
        yyyy: () => pad(y(), 4),
        h: () => H() % 12 || 12,
        hh: () => pad(H() % 12 || 12),
        H: () => H(),
        HH: () => pad(H()),
        M: () => M(),
        MM: () => pad(M()),
        s: () => s(),
        ss: () => pad(s()),
        l: () => pad(L(), 3),
        L: () => pad(Math.floor(L() / 10)),
        o: () =>
            (o() > 0 ? "-" : "+") +
            pad(Math.floor(Math.abs(o()) / 60) * 100 + (Math.abs(o()) % 60), 4),
        p: () =>
            (o() > 0 ? "-" : "+") +
            pad(Math.floor(Math.abs(o()) / 60), 2) +
            ":" +
            pad(Math.floor(Math.abs(o()) % 60), 2),
        N: () => N(),
    };

    return flags;
}


export const parseDate = (date: string): number | null => {
    if (typeof date === 'string') {
        return Date.parse(date)
    }
    return null;
}

export const dateToTimestamp = (date: string): number | null => {
    if (date) {
        const pDate = new Date(date);
        return parseFloat(`${pDate.getTime()}`);
    }
    return null;
}


export const formatDate = (date: Date, mask: string) => {
    const flags = getFormatFlags(date);
    return mask.replace(token, (match) => {
        if (match in flags) {
            return flags[match]().toString();
        }
        return match.slice(1, match.length - 1);
    });
}

export const formatDateTable = (date: string): string | null => {
    const pDate = parseDate(date);
    if (pDate) {
        return formatDate(new Date(pDate), 'HH:MM:ss yyyy-mm-dd')
    }
    return null;
}

