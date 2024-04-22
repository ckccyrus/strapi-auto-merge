import timestamp from "time-stamp";
import chalk from "chalk";

const Logger = (...args: any) => {
    const time = '[' + chalk.magenta(timestamp('HH:mm:ss')) + '] ==>';
    process.stdout.write(time + ' ');
    console.log.apply(console, args);
}

export default Logger;