const got = require('got');

/**
 * Loads info about build.
 *
 * @param {string} buildUrl - the relative url to build.
 * @returns {object}
 */
module.exports = (buildUrl) => {
    return got(buildUrl, { json: true })
        .then(response => response.body);
};
