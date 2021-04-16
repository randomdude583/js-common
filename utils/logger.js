/* eslint-disable no-console */
const path = require('path');
// const appDir = path.dirname(require.main.filename).split(path.sep).pop();

const { parentFuncName, getLocalDateTime, isLocalDevelopment, getLocalTime } = require('./common');

const isDev = isLocalDevelopment();


// const { LOG_COLORS = false, LOG_SHORT_TIME = false, LOG_SHOW_PARENT = false } = process.env;
const { LOG_COLORS = false, LOG_SHORT_TIME = false } = process.env;


const colors = {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',
    fg: {
        Black: '\x1b[30m',
        Red: '\x1b[31m',
        Green: '\x1b[32m',
        Yellow: '\x1b[33m',
        Blue: '\x1b[34m',
        Magenta: '\x1b[35m',
        Cyan: '\x1b[36m',
        White: '\x1b[37m',
        Crimson: '\x1b[38m'
    },
    bg: {
        Black: '\x1b[40m',
        Red: '\x1b[41m',
        Green: '\x1b[42m',
        Yellow: '\x1b[43m',
        Blue: '\x1b[44m',
        Magenta: '\x1b[45m',
        Cyan: '\x1b[46m',
        White: '\x1b[47m',
        Crimson: '\x1b[48m'
    }
};


module.exports = class Logger {
    constructor(prepend, basename = true) {

        if (!prepend) {
            throw new Error('You must specify the log prepend! Preferably, it should be the file that is calling the Logger class.');
        }
        if (basename) {
            try {
                prepend = path.normalize(prepend);
                prepend = prepend.replace(`${path.sep}index.js`, '');
                // if (LOG_SHOW_PARENT) {
                //     const segments = prepend.split(path.sep);
                //     prepend = '';
                //     if (segments[segments.length-1] != appDir) {
                //         prepend += segments[segments.length-2] + path.sep;
                //     } 
                //     prepend += segments[segments.length-1];
                // } else {
                prepend = path.basename(prepend);
                // }
            } catch (error) { }
        }

        if (!console.warn) {
            console.warn = console.log;
        }

        if (!console.error) {
            console.error = console.log;
        }

        this.build = (level, bgColor, fgColor) => {
            let dateTime;
            if (LOG_SHORT_TIME) {
                dateTime = getLocalTime();
            } else {
                dateTime = getLocalDateTime();
            }

            const a = [`[${dateTime}]`];

            level = `[${level}]`;
            if (LOG_COLORS && fgColor) {
                level = fgColor + level;
            }
            if (LOG_COLORS && bgColor) {
                level = bgColor + level;
            }

            a.push(level + colors.Reset);

            if (prepend && prepend !== 'index.js') {
                a.push(`[${prepend}]`);
            }
            return a;
        };


        this.trace = (...x) => {
            if (isDev) {
                console.log(...this.build('TRACE', colors.bg.Blue, colors.fg.White), `[${parentFuncName()}]`, ...x);
                console.trace();
            }
        };

        this.extra = (...x) => {
            if (isDev) {
                console.log(...this.build('EXTRA', colors.bg.Black, colors.fg.Cyan), `[${parentFuncName()}]`, ...x);
            }
        };

        this.debug = (...x) => {
            console.log(...this.build('DEBUG', colors.bg.Black, colors.fg.Blue), `[${parentFuncName()}]`, ...x);
        };

        this.info = (...x) => {
            console.log(...this.build('INFO', colors.bg.Black, colors.fg.White), `[${parentFuncName()}]`, ...x);
        };

        this.warn = (...x) => {
            console.warn(...this.build('WARN', colors.bg.Black, colors.fg.Yellow), `[${parentFuncName()}]`, ...x);
        };

        this.error = (...x) => {
            console.error(...this.build('ERROR', colors.bg.Black, colors.fg.Red), `[${parentFuncName()}]`, ...x);
        };

        this.fatal = (...x) => {
            console.error(...this.build('FATAL', colors.bg.Red, colors.fg.Black), `[${parentFuncName()}]`, ...x);
        };
    }
};