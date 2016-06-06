'use strict';

const test = require('ava');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

test.beforeEach(t => {
    t.context.loadJsonStub = sinon.stub().resolves({});

    t.context.load = proxyquire('../lib/load-builds', {
        './load-json': t.context.loadJsonStub
    });
});

test('should get info by url', async t => {
    await t.context.load('http://tc.url');

    t.true(t.context.loadJsonStub.calledWith('http://tc.url/guestAuth/app/rest/buildQueue'));
});

test('should load builds info', async t => {
    const buildQueueUrl = 'http://tc.url/guestAuth/app/rest/buildQueue';
    const buildUrl = 'http://tc.url/guestAuth/app/rest/buildQueue/id:1';

    t.context.loadJsonStub
        .withArgs(buildQueueUrl).resolves({
            href: '/guestAuth/app/rest/buildQueue',
            count: 1,
            build: [{
                id: 1,
                href: '/guestAuth/app/rest/buildQueue/id:1'
            }]
        })
        .withArgs(buildUrl).resolves({ id: 1 });

    const builds = await t.context.load('http://tc.url');

    t.deepEqual(builds, [{ id: 1 }]);
});
