import minimist from 'minimist';
import { paths, commitMessage } from './config.js';
import { info, error, text } from './utils/logger.js';
import { readJSON, writeJSON, listJSON } from './utils/files.js';
import shell from './utils/shell.js';

// get updated models object
const updateModels = async () => {
    const models = await listJSON(paths.models);
    let updated = {};
    models.forEach((model) => {
        updated = {
            ...updated,
            ...model.content,
        };
    });
    return updated;
};

// run git.sh
const push = async () => {
    const { output } = await shell({
        command: paths.script,
        params: [commitMessage],
    });
    return output;
};

// run operation
(async (args) => {
    try {
        const { operation } = minimist(args); // resolve cli options
        switch (operation) {
            case 'dry-run': {
                info('Current .mockend.json');
                text(await readJSON(paths.mockend));
                info('Updated .mockend.json');
                text(await updateModels());
                break;
            }
            case 'generate': {
                info('Current .mockend.json');
                text(await readJSON(paths.mockend));
                await writeJSON(paths.mockend, await updateModels());
                info('Updated .mockend.json');
                text(await readJSON(paths.mockend));
                break;
            }
            case 'push': {
                info('Push to repo');
                text(await push());
                break;
            }
            case 'update': {
                info('Current .mockend.json');
                text(await readJSON(paths.mockend));
                await writeJSON(paths.mockend, await updateModels());
                info('Updated .mockend.json');
                text(await readJSON(paths.mockend));
                info('Push to repo');
                text(await push());
                break;
            }
            default: {
                throw new Error(`Invalid operation [ ${operation} ]`);
            }
        }
    } catch (err) {
        error(err);
    }
})(process.argv.slice(2));
