import ErrorMessage from "./ErrorMessage";
import timestamp from 'time-stamp';
import chalk from 'chalk';

const Util = {
    ErrorMessage: ErrorMessage,

    log(...args) {
        var time = '[' + chalk.magenta(timestamp('HH:mm:ss')) + '] ==>';
        process.stdout.write(time + ' ');
        console.log.apply(console, args);
        // return this;
    },
    respond(args) {
        var { message, data } = args;

        return {
            "message": message,
            "data": data
        };
    }
}
export default Util;