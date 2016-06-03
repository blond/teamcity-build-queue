'use strict';

const url = require('url');

const debug = require('debug')('http');
const ms = require('ms');

const loadJson = require('./load-json');

const TEAMCITY_BUILD_QUEUE_PATHNAME = 'guestAuth/app/rest/buildQueue';

require('promise.prototype.finally');

/**
 * Loads full info about builds.
 *
 * @param {string} teamcityUrl - the URL to TeamCity host.
 * @returns {object}
 */
module.exports = (teamcityUrl) => {
    const startTime = Date.now();
    const queueUrl = url.resolve(teamcityUrl, TEAMCITY_BUILD_QUEUE_PATHNAME);

    return loadJson(queueUrl, 'build queue list')
        .then(json => {
            const builds = json && json.build || [];

            return Promise.all(builds.map(build => {
                const buildUrl = url.resolve(teamcityUrl, build.href);

                return loadJson(buildUrl, `build ${build.id}`);
            }));
        })
        .finally(() => {
            const endTime = Date.now();
            const duration = ms(endTime - startTime);

            debug(`build queue loaded in ${duration}`);
        });
};
