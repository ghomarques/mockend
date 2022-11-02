import chalk from 'chalk';
import { inspect } from 'util';

const details = (data) =>
    inspect(data, {
        showHidden: false,
        depth: null,
        colors: false,
    });

export const error = (data) => {
    console.error(chalk.white.bgRed.bold(details(data)));
};

export const info = (data) => {
    console.log(chalk.white.bgBlue(details(data)));
};

export const text = (data) => {
    console.log(chalk.white(details(data)));
};
