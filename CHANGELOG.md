Changelog
=========

v1.1.2 (2016-08-31)
-------------------

### Dependencies

* Updated `promise.prototype.finally` to `v2.0.0`.

### Commits

* [[`dd3bbff`](https://github.com/blond/teamcity-build-queue/commit/dd3bbff)] - chore(package): update nyc to version 8.1.0 (@greenkeeperio-bot)
* [[`03e427b`](https://github.com/blond/teamcity-build-queue/commit/03e427b)] - Update README.md (@blond)
* [[`ef8b49f`](https://github.com/blond/teamcity-build-queue/commit/ef8b49f)] - chore(package): update ava to version 0.16.0 (@greenkeeperio-bot)

v1.1.1 (2016-07-17)
-------------------

### Dependencies

* Updated `micromatch` to `v2.3.11`.
* Updated `is-url` to `v1.2.2`.

### Commits

* [[`b8730c6`](https://github.com/blond/teamcity-build-queue/commit/b8730c6)] - chore(package): update micromatch to version 2.3.11 (@greenkeeperio-bot)
* [[`5a93a4c`](https://github.com/blond/teamcity-build-queue/commit/5a93a4c)] - chore(package): update nyc to version 7.0.0 (@greenkeeperio-bot)
* [[`0877bad`](https://github.com/blond/teamcity-build-queue/commit/0877bad)] - chore(package): update eslint-config-pedant to version 0.7.0 (@greenkeeperio-bot)
* [[`19f6807`](https://github.com/blond/teamcity-build-queue/commit/19f6807)] - chore(package): update eslint to version 3.0.0 (@greenkeeperio-bot)
* [[`c4420c5`](https://github.com/blond/teamcity-build-queue/commit/c4420c5)] - chore(package): update is-url to version 1.2.2 (@greenkeeperio-bot)
* [[`113f9fd`](https://github.com/blond/teamcity-build-queue/commit/113f9fd)] - chore(package): update micromatch to version 2.3.10 (@greenkeeperio-bot)

v1.1.0 (2016-06-06)
-------------------

### Performance

* Reduced the number of http requests to ignore builds without compatible agents ([#2]).

### Debug

* Added debug info for http requests. Use `DEBUG=http` environment variable to enable debug info ([#2]).

[#2]: https://github.com/blond/teamcity-build-queue/pull/2

### Commits

* [[`07be5ad`](https://github.com/blond/teamcity-build-queue/commit/07be5ad)] - test(debug): fix tests for debug using (@blond)
* [[`fa7213a`](https://github.com/blond/teamcity-build-queue/commit/fa7213a)] - feat(debug): use debug for http requests (@blond)
* [[`59feb94`](https://github.com/blond/teamcity-build-queue/commit/59feb94)] - test(compatible agents): use wait reason status (@blond)
* [[`45eeab7`](https://github.com/blond/teamcity-build-queue/commit/45eeab7)] - perf(compatible agents): use wait reason status (@blond)
