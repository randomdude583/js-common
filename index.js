const Logger = require('./utils/logger');

const logger = new Logger(__filename);


module.exports = class Library {
    constructor() {
        logger.debug();
    }

    print() {
        logger.trace('this');
        logger.extra('this');
        logger.debug('this');
        logger.info('this');
        logger.warn('this');
        logger.error('this');
        logger.fatal('this');
    }

};