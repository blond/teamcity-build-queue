'use strict';

const test = require('ava');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

test.beforeEach(t => {
    t.context.gotStub = sinon.stub().resolves({ body: {} });
    t.context.loadStub = sinon.stub().resolves([]);
    t.context.filterStub = sinon.stub().returns([]);

    t.context.run = proxyquire('../index', {
        got: t.context.gotStub,
        './lib/load-build': t.context.loadStub,
        './lib/filter-builds': t.context.filterStub
    });
});

test('should get info by url', async t => {
    await t.context.run('http://tc.url');

    t.true(t.context.gotStub.calledWith('http://tc.url/guestAuth/app/rest/buildQueue'));
});

test('should returns builds of queue', async t => {
    const builds = [{ id: '1' }];

    t.context.filterStub.returns(builds);

    const queue = await t.context.run('http://tc.url');

    t.deepEqual(queue.builds, builds);
});

test('should returns queue size', async t => {
    const builds = [{ id: '1' }];

    t.context.filterStub.returns(builds);

    const queue = await t.context.run('http://tc.url');

    t.is(queue.size, builds.length);
});

test('should load build info', async t => {
    t.context.gotStub.resolves({
        body: {
            href: '/guestAuth/app/rest/buildQueue',
            count: 1,
            build: [{ href: 'build-url-1' }]
        }
    });

    await t.context.run('http://tc.url');

    t.true(t.context.loadStub.calledWith('http://tc.url/build-url-1'));
});
