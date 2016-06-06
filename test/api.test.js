'use strict';

const test = require('ava');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

test.beforeEach(t => {
    t.context.loadStub = sinon.stub().resolves([]);
    t.context.filterStub = sinon.stub().returns([]);

    t.context.run = proxyquire('../index', {
        './lib/load-builds': t.context.loadStub,
        './lib/filter-builds': t.context.filterStub
    });
});

test('should load builds of queue', async t => {
    await t.context.run('http://tc.url');

    t.true(t.context.loadStub.called);
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
