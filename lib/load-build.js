const got = require('got');

/**
 * Loads info about compatible agents of build.
 *
 * @param {string} buildUrl - the relative url to build.
 * @returns {object}
 */
function loadBuild(buildUrl) {
    return got(buildUrl, { json: true })
        .then(response => response.body);
}

/**
 * Loads info about compatible agents of build.
 *
 * @param {string} buildUrl - the relative url to build.
 * @returns {object}
 */
function loadCompatibleAgents(buildUrl) {
    const agentsUrl = `${buildUrl}/compatibleAgents`;

    return got(agentsUrl, { json: true })
        .then(response => response.body.agent)
        .catch(() => ([])); // If build had time to start, compatible agents url returns error.
}

/**
 * Loads info about build with it compatible agents.
 *
 * @param {string} buildUrl - the relative url to build.
 * @returns {object}
 */
module.exports = (buildUrl) => {
    return Promise.all([
        loadBuild(buildUrl),
        loadCompatibleAgents(buildUrl)
    ]).then(data => {
        const build = data[0];
        const compatibleAgents = data[1];

        build.compatibleAgents = compatibleAgents;

        return build;
    });
};
