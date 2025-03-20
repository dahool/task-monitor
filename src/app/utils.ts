import { Duration } from "luxon"

export function convertMilliseconds(ms: number): { [key: string]: number } {
    if (ms === 0) return { milliseconds: 0 }; // Special case: all are 0

    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    ms %= 24 * 60 * 60 * 1000;

    const hours = Math.floor(ms / (60 * 60 * 1000));
    ms %= 60 * 60 * 1000;

    const minutes = Math.floor(ms / (60 * 1000));
    ms %= 60 * 1000;

    const seconds = Math.floor(ms / 1000);
    ms %= 1000;

    // Build the result object, excluding 0 values
    const result: { [key: string]: number } = {};
    if (days > 0) result.days = days;
    if (hours > 0) result.hours = hours;
    if (minutes > 0) result.minutes = minutes;
    if (seconds > 0) result.seconds = seconds;
    if (ms > 0) result.milliseconds = ms;

    return Object.keys(result).length > 0 ? result : { milliseconds: 0 };
}

export function toHumanDuration(ms: number): string {
    return Duration.fromObject(convertMilliseconds(ms)).toHuman({ unitDisplay: 'short' });
}