import { readFile, writeFile, readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// get absolute path (scope is import.meta.url from caller)
export const getPath = (scope) => dirname(fileURLToPath(scope));

// resolve path
export const resolvePath = (path1, path2) => join(path1, path2);

// read json file contents
export const readJSON = async (filepath) => JSON.parse(await readFile(filepath));

// write object as json file
export const writeJSON = async (filepath, data) =>
    await writeFile(filepath, JSON.stringify(data), { encoding: 'utf8', flag: 'w' });

// resolve models (uses 'for' to await, serial)
export const listJSON = async (dir) => {
    const files = [];
    const list = await readdir(dir);
    for (let index = 0; index < list.length; index++) {
        const filename = list[index];
        const filepath = join(dir, filename);
        const content = await readJSON(filepath);
        files.push({
            filename,
            filepath,
            content,
        });
    }
    return files;
};
