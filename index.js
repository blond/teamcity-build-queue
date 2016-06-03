'use strict';

const assert = require('assert');

const isUrl = require('is-url');

const loadBuilds = require('./lib/load-builds');
const filterBuilds = require('./lib/filter-builds');

/**
 * Loads info about TeamCity Build Queue.
 *
 * @param {string} teamcityUrl - the URL to TeamCity host.
 * @param {object} options - the options.
 * @param {string} options.projectPattern - the pattern of project name to filter builds.
 * @param {boolean} options.ignoreDependencies - to ignore builds with dependencies that have not been built yet.
 * @param {boolean} options.ignoreIncompatibleAgents - to ignore builds without compatible agents.
 * @returns {{builds: object[], size: number}}
 */
module.exports = (teamcityUrl, options) => {
    assert(isUrl(teamcityUrl), 'You should specify url to TeamCity');

    return loadBuilds(teamcityUrl)
        .then(builds => filterBuilds(builds, options))
        .then(builds => ({
            builds: builds,
            size: builds.length
        }));
};
