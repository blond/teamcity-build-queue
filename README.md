teamcity-build-queue
====================

[![NPM Status][npm-img]][npm]
[![Travis Status][test-img]][travis]
[![Coverage Status][coverage-img]][coveralls]
[![Dependency Status][dependency-img]][david]

[npm]:            https://www.npmjs.org/package/teamcity-build-queue
[npm-img]:        https://img.shields.io/npm/v/teamcity-build-queue.svg

[travis]:         https://travis-ci.org/blond/teamcity-build-queue
[test-img]:       https://img.shields.io/travis/blond/teamcity-build-queue.svg?label=tests

[coveralls]:      https://coveralls.io/r/blond/teamcity-build-queue
[coverage-img]:   https://img.shields.io/coveralls/blond/teamcity-build-queue.svg

[david]:          https://david-dm.org/blond/teamcity-build-queue
[dependency-img]: http://img.shields.io/david/blond/teamcity-build-queue.svg

The helper to get info about TeamCity Build Queue.

Install
-------

```
$ npm install --save teamcity-build-queue
```

Usage
-----

```js
const queueInfo = require('teamcity-build-queue');

queueInfo('http://teamcity.domain.com', {
    projectPattern: 'project :: Pull requests :: *',
    ignoreDependencies: true,       // ignore builds with dependencies that have not been built yet
    ignoreIncompatibleAgents: true  // ignore builds without compatible agents
})
.then(queue => {
    console.log(queue.builds);
    console.log(queue.size);
});
```

API
---

### queueInfo(url[, options])

Returns a Promise, that resolves to object with builds from Build Queue.

#### url

Type: `string`

The URL to TeamCity host.

#### options

Type: `object`

#### options.projectPattern

Type: `string`

The pattern of project name to filter builds.

If pattern is not specified, then all builds will be in the result.

**Wildcards**

```js
queueInfo('http://teamcity.domain.com', {
    projectPattern: 'project :: Pull requests :: *'
});

// Will be taken into account builds the following assemblies:

// project :: Pull requests :: build
// project :: Pull requests :: tests :: unit
// project :: Pull requests :: tests :: e2e
// project :: Pull requests :: docs
// project :: Pull requests :: deploy
// ...
```

**Brace Expansion**

```js
queueInfo('http://teamcity.domain.com', {
    projectPattern: 'project :: {Pull requests, dev} :: *'
});

// Will be taken into account builds the following configurations:
//
// project :: Pull requests :: build
// project :: Pull requests :: tests
// ...
// project :: dev :: build
// project :: dev :: tests
// ...
```

Read more about it in [micromatch](https://github.com/jonschlinkert/micromatch#features) package.

#### options.ignoreDependencies

Type: `boolean` Default: `false`

To ignore builds with dependencies that have not been built yet.

#### options.ignoreIncompatibleAgents

Type: `boolean` Default: `false`

To ignore builds without compatible agents.

License
-------

MIT © [Andrew Abramov](https://github.com/blond)
