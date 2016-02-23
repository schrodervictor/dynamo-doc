[![Build Status](https://travis-ci.org/schrodervictor/dynamo-doc.svg?branch=master)](https://travis-ci.org/schrodervictor/dynamo-doc)

dynamo-doc
==========

An useful converter between js/json objects and the super-boring-strong-typed
object structure expected by AWS DynamoDB.

With this module you can just jump into reading and wrinting objects into
DynamoDB tables with plain js objects (well, not really, because the queries
are also a hell, but take a look at our energy-db module that makes your
life easier).

## Instalation

If you are reading you know how to install a npm module. Just put it in your
dependencies list or install it globally if you are one of those people.

## How to use it

Normally you will want to convert a full object. To do that, use the following
methods:

```
var dynamoDoc = require('dynamo-doc');

var json = {
    "some-key": "a string",
    "another-key": 12345
};

dynamoDoc.jsToDynamo(json, function(err, dynamo) {
    if (err) throw err;
    console.log(dynamo); // Outputs the dynamo object bellow
});
```

```
var dynamo = {
    "some-key": { "S": "a string" },
    "another-key": { "N": "12345" }
};

dynamoDoc.dynamoToJs(dynamo, function(err, json) {
    if (err) throw err;
    console.log(json); // Outputs the json object above
});
```

There are also two other methods to convert each individual value type.
This can be useful if you want to convert only certain parts, like the
expression values on queries and scans. If you think you need this, I suggest
you to take a look on the code and the tests, because they are pretty simple
and self-explanatory.

## Unit tests

This module was TDD'ed. 100% test coverage using mocha+chai. Reading the tests
is the best way to learn how to use it and to know what to expect.

## Contributing

Fork the repo, create a branch, do awesome additions and submit a
pull-request. Only PR's with tests will be considered.

## Releases

* 0.1.1 Bugfix (zero was reporting as boolean)
* 0.1.0 Initial release
