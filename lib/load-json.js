'use strict';

const got = require('got');
const ms = require('ms');
const debug = require('debug')('http');

/**
 * Loads JSON by HTTP.
 *
 * @param {string} url - the URL to request.
 * @param {string} logCtx - the context for logging.
 * @returns {object}
 */
module.exports = (url, logCtx) => {
    const startTime = Date.now();

    debug(`loading ${logCtx}`);

    return got(url, { json: true })
        .then(response => {
            const endTime = Date.now();
            const duration = ms(endTime - startTime);

            debug(`${logCtx} successfully loaded in ${duration}`);

            return response.body;
        })
        .catch(err => {
            debug(`${logCtx} failed with ${err}`);

            throw err;
        });
};
