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
