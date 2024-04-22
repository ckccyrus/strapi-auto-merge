import timestamp from "time-stamp";
import chalk from "chalk";

const LogError = (...args: any) => {
    const time = '[' + chalk.magenta(timestamp('HH:mm:ss')) + '] ==>';
    process.stdout.write(time + ' ');
    args[0] = chalk.red(args[0]);
    console.error.apply(console, args);
}

export default LogError;