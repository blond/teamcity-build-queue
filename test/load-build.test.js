'use strict';

const test = require('ava');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

test.beforeEach(t => {
    t.context.gotStub = sinon.stub();
    t.context.gotStub.withArgs('build_url').resolves({ body: {} });
    t.context.gotStub.withArgs('build_url/compatibleAgents').resolves({ body: { agent: [] } });

    t.context.load = proxyquire('../lib/load-build', {
        got: t.context.gotStub
    });
});

test('should return build info', async t => {
    t.context.gotStub.withArgs('build_url').resolves({ body: { id: '1' } });

    const info = await t.context.load('build_url');

    t.is(info.id, '1');
});

test('should add empty field if no compatible agents', async t => {
    const info = await t.context.load('build_url')

    t.deepEqual(info.compatibleAgents, []);
});

test('should add empty field with compatible agents', async t => {
    const agents = [{ id: '1' }];

    t.context.gotStub.withArgs('build_url/compatibleAgents').resolves({ body: { agent: agents } });

    const info = await t.context.load('build_url');

    t.deepEqual(info.compatibleAgents, agents);
});

test('should not throw if an error occurred while getting compatible agents', async t => {
    t.context.gotStub.withArgs('build_url/compatibleAgents').rejects();

    const info = await t.context.load('build_url');

    t.deepEqual(info.compatibleAgents, []);
});
