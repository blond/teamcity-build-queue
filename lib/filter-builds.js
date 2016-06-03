'use strict';

const mm = require('micromatch');

/**
 * Removes slashes.
 *
 * @param {string} str - some string.
 * @returns {string}
 */
function clearSlash(str) {
    return str.replace(/\//g, '');
}

/**
 * Returns `true` if the project name of build match the project pattern.
 *
 * @param {object} build - the build info.
 * @param {string} projectPattern - the pattern of project name to filter builds.
 * @returns {boolean}
 */
function isMatchProjectName(build, projectPattern) {
    const buildType = build.buildType;
    const projectName = buildType && buildType.projectName;

    return mm.isMatch(clearSlash(projectName), clearSlash(projectPattern), { nocase: true });
}

/**
 * Returns `true` the build has dependency builds.
 *
 * @param {object} build - the build info.
 * @returns {boolean}
 */
function hasDependencies(build) {
    return build.waitReason === 'Build dependencies have not been built yet';
}

/**
 * Returns `true` the build has compatible agents.
 *
 * @param {object} build - the build info.
 * @returns {boolean}
 */
function hasCompatibleAgents(build) {
    return build.waitReason !== 'This build will not start because there are no compatible agents which can run it';
}

/**
 * Filters builds by projectPattern and ignores inappropriate builds.
 *
 * @param {object[]} builds - the objects with build info.
 * @param {string} options - the options.
 * @param {string} options.projectPattern - the pattern of project name to filter builds.
 * @param {boolean} options.ignoreDependencies - to ignore builds with dependencies that have not been built yet.
 * @param {boolean} options.ignoreIncompatibleAgents - to ignore builds without compatible agents.
 * @returns {object[]}
 */
module.exports = (builds, options) => {
    const projectPattern = options.projectPattern;

    return builds.filter(build => {
        if (projectPattern && !isMatchProjectName(build, projectPattern)
            || options.ignoreDependencies && hasDependencies(build)
            || options.ignoreIncompatibleAgents && !hasCompatibleAgents(build)
        ) {
            return false;
        }

        return true;
    });
};
