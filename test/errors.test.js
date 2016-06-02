'use strict';

const test = require('ava');

const queueInfo = require('../index');

test('should throw error if url is not speсified', t => {
    t.throws(
        () => queueInfo(),
        'You should specify url to TeamCity'
    );
});

test('should throw error if url is not url', t => {
    t.throws(
        () => queueInfo('bla'),
        'You should specify url to TeamCity'
    );
});
