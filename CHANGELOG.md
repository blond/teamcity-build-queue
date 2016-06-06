Changelog
=========

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
