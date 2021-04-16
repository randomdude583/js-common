let { NODE_ENV = 'development' } = process.env;

// eslint-disable-next-line no-undef
if (typeof window !== 'undefined') {
    try {
        // eslint-disable-next-line no-undef
        const { hostname } = window.location;
        if (hostname !== 'localhost' && new RegExp('([a-z-0-9]{2,63}).([a-z.]{2,5})$').exec(hostname) !== null) {
            if (hostname.indexOf('staging') >= 0) {
                NODE_ENV = 'staging';
            } else {
                NODE_ENV = 'production';
            }
        }
    } catch (error) { }
}

module.exports = {
    NODE_ENV,
};