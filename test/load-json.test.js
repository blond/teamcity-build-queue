'use strict';

const test = require('ava');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

test.beforeEach(t => {
    t.context.gotStub = sinon.stub().resolves({ body: { res: 'bla' } });

    t.context.load = proxyquire('../lib/load-json', {
        got: t.context.gotStub
    });
});

test('should return json', async t => {
    const info = await t.context.load('url');

    t.deepEqual(info, { res: 'bla' });
});

test('should throw error', t => {
    t.context.gotStub.rejects();

    t.throws(t.context.load('url'));
});
