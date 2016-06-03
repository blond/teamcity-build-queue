'use strict';

const assert = require('assert');
const url = require('url');

const isUrl = require('is-url');
const got = require('got');

const loadBuild = require('./lib/load-build');
const filterBuilds = require('./lib/filter-builds');

const TEAMCITY_BUILD_QUEUE_PATHNAME = 'guestAuth/app/rest/buildQueue';

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

    return got(url.resolve(teamcityUrl, TEAMCITY_BUILD_QUEUE_PATHNAME), { json: true })
        .then(response => {
            const body = response.body;
            const builds = body && body.build || [];

            return Promise.all(builds.map(build => {
                const buildUrl = url.resolve(teamcityUrl, build.href);

                return loadBuild(buildUrl);
            }));
        })
        .then(builds => filterBuilds(builds, options))
        .then(builds => ({
            builds: builds,
            size: builds.length
        }));
};
