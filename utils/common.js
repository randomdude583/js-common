const { NODE_ENV } = require('../constants');
const { DEFAULT_TIMEZONE = 'America/Los_Angeles' } = process.env;

const isLocalDevelopment = () => {
    try {
        // eslint-disable-next-line no-undef
        if (typeof window === 'undefined') {
            return NODE_ENV !== 'staging' && NODE_ENV !== 'production';
        }

        // eslint-disable-next-line no-undef
        const { hostname } = window.location;
        return hostname === 'localhost' || new RegExp('([a-z-0-9]{2,63}).([a-z.]{2,5})$').exec(hostname) === null;
    } catch (error) {
        return false;
    }
};

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const mask = (str) => {
    try {
        return str.split('').map(() => '*').join('');
    } catch (error) { }
    return '';
};

const pad = (n, width = 2, z = '0') => {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

/* eslint-disable no-console */
const findFirstOccurrence = (string, searchElements, fromIndex = 0) => {
    try {
        let min = string.length;
        for (let i = 0; i < searchElements.length; i += 1) {
            const occ = string.indexOf(searchElements[i], fromIndex);
            if (occ !== -1 && occ < min) {
                min = occ;
            }
        }
        return min === string.length ? -1 : min;
    } catch (error) {
        console.error('Unable to findFirstOccurrence', error);
    }
};

const getFnNameFromStack = (stack, append) => {
    try {
        const firstCharacter = stack.indexOf('at ') + 3;
        const lastCharacter = findFirstOccurrence(stack, [' ', ':', '\n'], firstCharacter);
        return `${stack.slice(firstCharacter, lastCharacter).replace('Object.', '')}${append}`;
    } catch (error) {
        console.error('Unable to getFnNameFromStack', error);
    }
};

const funcName = (func = null, append = '();') => {
    try {
        if (func) {
            if (func.name) {
                return `${func.name}${append}`;
            }
            const result = /^function\s+([\w$]+)\s*\(/.exec(func.toString());
            return `${result ? result[1] : ''}${append}`;
        }
        const obj = {};
        Error.captureStackTrace(obj, funcName);
        const { stack } = obj;
        return getFnNameFromStack(stack, append);
    } catch (error) {
        console.error('Unable to funcName', error);
    }
};

const parentFuncName = (append = '();') => {
    try {
        const obj = {};
        Error.captureStackTrace(obj, parentFuncName);
        const { stack } = obj;
        return getFnNameFromStack(stack.split('\n').slice(2).join('\n'), append);
    } catch (error) {
        console.error('Unable to parentFuncName', error);
    }
};

const getLocalDateTime = (millis = new Date().getTime(), timeZone = DEFAULT_TIMEZONE) => {

    try {
        const dt = new Date(millis);
        if (dt.toLocaleDateString() === 'Invalid Date') {
            return '';
        }
        return `${dt.toLocaleDateString('en-US', { timeZone })} ${dt.toLocaleTimeString('en-US', { timeZone })}`;
    } catch (error) {
        console.error('Unable to getLocalDateTime', error);
    }
};

const getLocalTime = (millis = new Date().getTime(), timeZone = DEFAULT_TIMEZONE) => {

    try {
        const dt = new Date(millis);
        if (dt.toLocaleDateString() === 'Invalid Date') {
            return '';
        }
        return `${dt.toLocaleTimeString('en-US', { timeZone })}`;
    } catch (error) {
        console.error('Unable to getLocalTime', error);
    }
};

const clone = (object) => JSON.parse(JSON.stringify(object));

module.exports = {
    isValidEmail,
    isLocalDevelopment,
    mask,
    pad,
    funcName,
    parentFuncName,
    getLocalDateTime,
    getLocalTime,
    clone,
};