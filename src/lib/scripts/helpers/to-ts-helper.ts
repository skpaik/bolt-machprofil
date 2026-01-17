
/**
 * Converts JS values to valid TypeScript literals
 * with unquoted object keys
 */

export function toTsObject(value: unknown, indent = 2, depth = 0): string {
    const pad = " ".repeat(indent * depth);
    const nextPad = " ".repeat(indent * (depth + 1));

    if (Array.isArray(value)) {
        if (value.length === 0) return "[]";
        return `[\n${value
            .map((v) => `${nextPad}${toTsObject(v, indent, depth + 1)}`)
            .join(",\n")}\n${pad}]`;
    }

    if (value && typeof value === "object") {
        const entries = Object.entries(value);
        if (entries.length === 0) return "{}";

        return `{\n${entries
            .map(([k, v]) => `${nextPad}${k}: ${toTsObject(v, indent, depth + 1)}`)
            .join(",\n")}\n${pad}}`;
    }

    if (typeof value === "string") {
        return JSON.stringify(value);
    }

    return String(value);
}
