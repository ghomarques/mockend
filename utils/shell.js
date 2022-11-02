import { spawn } from 'child_process';
import { StringDecoder } from 'string_decoder';

// decode process message
const decoder = new StringDecoder('utf8');

// parse child process stdout
const parse = (data) => {
    let parsed = decoder.write(data);
    parsed = parsed.split(/\n\t*/);
    return parsed.filter((part) => (part !== '' ? true : false)); // remove blank lines
};

// spawn child process and run command on it
export default ({ command, params = [], options = {} }) =>
    new Promise((resolve, reject) => {
        const output = [];
        try {
            const runtime = spawn(command, params, options); // spawn child process

            runtime.stdout.on('data', (data) => {
                output.push(parse(data));
            });

            runtime.stderr.on('data', (data) => {
                output.push(parse(data));
            });

            runtime.stderr.on('error', (error) => {
                output.push(parse(error));
            });

            runtime.on('error', (error) => {
                output.push(parse(error));
            });

            runtime.on('close', (code) => {
                resolve({
                    code,
                    output,
                });
            });
        } catch (error) {
            reject({
                error,
                output,
            });
        }
    });
