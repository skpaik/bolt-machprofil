import fs from "fs";
import path from "path";

export const FILE_MAP = {
    "info.ts": "personal-info.ts",
    "home.ts": "personal-home.ts",
    "profile.ts": "personal-profile.ts",
    "static_contents.ts": "static_contents-1.ts",
} as const;

export type InputFileName = keyof typeof FILE_MAP;
export type OutputFileName = (typeof FILE_MAP)[InputFileName];

const ROOT = path.resolve("src/data/contents");

type DataItem = {
    id: string;
    [key: string]: unknown;
};

function walk(dir: string): string[] {
    return fs.readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
        const fullPath = path.join(dir, entry.name);
        return entry.isDirectory() ? walk(fullPath) : fullPath;
    });
}

function extractArrayData(source: string): readonly DataItem[] | null {
    const match = source.match(
        /export const data\s*=\s*(\[[\s\S]*?\])\s*as const;/
    );

    if (!match) return null;

    // Trusted internal files only
    // eslint-disable-next-line no-new-func
    return Function(`"use strict"; return ${match[1]}`)();
}

function arrayToObjectById(array: readonly DataItem[]) {
    const result: Record<string, Omit<DataItem, "id">> = {};

    for (const item of array) {
        const {id, ...rest} = item;
        if (!id) {
            throw new Error("Missing 'id' field in data item");
        }
        result[id] = rest;
    }

    return result;
}

function processFile(filePath: string) {
    const fileName = path.basename(filePath) as InputFileName;
    const outputFileName = FILE_MAP[fileName];
    if (!outputFileName) return;

    const source = fs.readFileSync(filePath, "utf-8");
    const arrayData = extractArrayData(source);
    if (!arrayData) return;

    const objectData = arrayToObjectById(arrayData);

    const output = `export const data = ${JSON.stringify(objectData, null, 2)} as const;
export default data;
`;

    const outputPath = path.join(path.dirname(filePath), outputFileName);
    fs.writeFileSync(outputPath, output);

    console.log(`✔ ${fileName} → ${outputFileName}`);
}

function main() {
    walk(ROOT).forEach(processFile);
}


export function convertContentListToObject(): void {
    main();
}
