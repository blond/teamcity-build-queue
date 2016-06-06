'use strict';

const test = require('ava');

const filter = require('../lib/filter-builds');

test('should filter builds by project name', t => {
    const builds = [
        { buildType: { projectName: 'Project :: PR' } },
        { buildType: { projectName: 'Other Project :: PR' } }
    ];
    const filteredBuilds = filter(builds, { projectPattern: 'Project :: PR' });

    t.deepEqual(filteredBuilds, [{ buildType: { projectName: 'Project :: PR' } }]);
});

test('should filter builds by pattern of project name', t => {
    const builds = [
        { buildType: { projectName: 'Project :: dev' } },
        { buildType: { projectName: 'Project :: PR' } },
        { buildType: { projectName: 'Other Project :: PR' } }
    ];
    const filteredBuilds = filter(builds, { projectPattern: 'project :: *' });

    t.deepEqual(filteredBuilds, [
        { buildType: { projectName: 'Project :: dev' } },
        { buildType: { projectName: 'Project :: PR' } }
    ]);
});

test('should filter builds by pattern of project name with slash', t => {
    const builds = [
        { buildType: { projectName: 'Project :: test/PR/deploy' } },
        { buildType: { projectName: 'Project :: dev' } }
    ];
    const filteredBuilds = filter(builds, { projectPattern: 'project :: *' });

    t.deepEqual(filteredBuilds, [
        { buildType: { projectName: 'Project :: test/PR/deploy' } },
        { buildType: { projectName: 'Project :: dev' } }
    ]);
});

test('should ignore builds with dependency reason', t => {
    const builds = [
        { waitReason: 'Build dependencies have not been built yet' },
        { waitReason: 'This build will not start because there are no compatible agents which can run it' }
    ];

    const filteredBuilds = filter(builds, { ignoreDependencies: true });

    t.deepEqual(filteredBuilds, [{
        waitReason: 'This build will not start because there are no compatible agents which can run it'
    }]);
});

test('should not ignore builds without wait reason', t => {
    const builds = [{ state: 'queued' }];
    const filteredBuilds = filter(builds, { ignoreDependencies: true });

    t.deepEqual(filteredBuilds, [{ state: 'queued' }]);
});

test('should ignore builds without compatible agents', t => {
    const builds = [
        {
            state: 'queued',
            waitReason: 'This build will not start because there are no compatible agents which can run it'
        },
        {
            state: 'queued',
            waitReason: 'The build should start shortly.'
        }
    ];
    const filteredBuilds = filter(builds, { ignoreIncompatibleAgents: true });

    t.deepEqual(filteredBuilds, [{
        state: 'queued',
        waitReason: 'The build should start shortly.'
    }]);
});
