import { config } from 'dotenv-safe';
import { getPath, resolvePath } from './utils/files.js';

// load .env
const { parsed } = config();
export const commitMessage = parsed.COMMIT_MESSAGE;

// absolute paths
const root = getPath(import.meta.url);
export const paths = {
    mockend: resolvePath(root, './.mockend.json'),
    models: resolvePath(root, './models'),
    script: resolvePath(root, './git.sh'),
};
