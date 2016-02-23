'use strict';

var expect = require('chai').expect;

var dynamoDoc = require('../lib/dynamo-doc');

describe('Dynamo Doc main', function() {

    describe('#dynamoValue(doc)', function() {

        it('should deal with strings', function() {
            var str = "some value";
            var value = {S: "some value"};
            var result = dynamoDoc.dynamoValue(str);
            expect(result).to.deep.equal(value);
        });

        it('should deal with integers', function() {
            var number = 12345;
            var value = {N: '12345'};
            var result = dynamoDoc.dynamoValue(number);
            expect(result).to.deep.equal(value);
        });

        it('should handle zero correctly', function() {
            var number = 0;
            var value = {N: '0'};
            var result = dynamoDoc.dynamoValue(number);
            expect(result).to.deep.equal(value);
        });

        it('should deal with floats', function() {
            var number = 12345.67;
            var value = {N: '12345.67'};
            var result = dynamoDoc.dynamoValue(number);
            expect(result).to.deep.equal(value);
        });

        it('should deal with booleans', function() {
            var bool = true;
            var value = {BOOL: true};
            var result = dynamoDoc.dynamoValue(bool);
            expect(result).to.deep.equal(value);

            bool = false;
            value = {BOOL: false};
            result = dynamoDoc.dynamoValue(bool);
            expect(result).to.deep.equal(value);
        });

        it('should deal with null and undefined', function() {
            var test = null;
            var value = {NULL: true};
            var result = dynamoDoc.dynamoValue(test);
            expect(result).to.deep.equal(value);

            test = undefined;
            result = dynamoDoc.dynamoValue(test);
            expect(result).to.deep.equal(value);
        });

        it('should deal with Arrays', function() {
            var arr = [
                'a string',
                12345,
                'another string',
                false,
                null
            ];
            var value = {L:
                [
                    {S: 'a string'},
                    {N: '12345'},
                    {S: 'another string'},
                    {BOOL: false},
                    {NULL: true}
                ]
            };
            var result = dynamoDoc.dynamoValue(arr);
            expect(result).to.deep.equal(value);
        });

        it('should deal with Objects', function() {
            var obj = {
                key1: 'a string',
                key2: 12345,
                key3: 'another string',
                key4: false,
                key5: null,
                key6: {
                    nestedKey: {
                        anotherLevel: 'with a string'
                    }
                }
            };
            var value = {M: {
                key1: {S: 'a string'},
                key2: {N: '12345'},
                key3: {S: 'another string'},
                key4: {BOOL: false},
                key5: {NULL: true},
                key6: {M: {
                    nestedKey: {M: {
                        anotherLevel: {S: 'with a string'}
                    }}
                }}
            }};
            var result = dynamoDoc.dynamoValue(obj);
            expect(result).to.deep.equal(value);
        });

        it('should deal with numeric sets', function() {
            var numSet = new Set([1, 2, 123]);
            var value = {NS: [
                '1',
                '2',
                '123'
            ]};
            var result = dynamoDoc.dynamoValue(numSet);
            expect(result).to.deep.equal(value);
        });

        it('should deal with string sets', function() {
            var numSet = new Set(['one', 'two', 'one hundred twenty three']);
            var value = {SS: [
                'one',
                'two',
                'one hundred twenty three'
            ]};
            var result = dynamoDoc.dynamoValue(numSet);
            expect(result).to.deep.equal(value);
        });
    });

    describe('#jsValue(doc)', function() {

        it('should deal with strings', function() {
            var value = {S: "some value"};
            var str = "some value";
            var result = dynamoDoc.jsValue(value);
            expect(result).to.equals(str);
        });

        it('should deal with integers', function() {
            var value = {N: '12345'};
            var number = 12345;
            var result = dynamoDoc.jsValue(value);
            expect(result).to.equals(number);
        });

        it('should deal with floats', function() {
            var value = {N: '12345.67'};
            var number = 12345.67;
            var result = dynamoDoc.jsValue(value);
            expect(result).to.equals(number);
        });

        it('should deal with booleans', function() {
            var value = {BOOL: true};
            var bool = true;
            var result = dynamoDoc.jsValue(value);
            expect(result).to.equals(bool);

            bool = false;
            value = {BOOL: false};
            result = dynamoDoc.jsValue(value);
            expect(result).to.equals(bool);
        });

        it('should deal with null', function() {
            var value = {NULL: true};
            var test = null;
            var result = dynamoDoc.jsValue(value);
            expect(result).to.equals(test);
        });

        it('should deal with Arrays', function() {
            var value = {L:
                [
                    {S: 'a string'},
                    {N: '12345'},
                    {S: 'another string'},
                    {BOOL: false},
                    {NULL: true}
                ]
            };
            var arr = [
                'a string',
                12345,
                'another string',
                false,
                null
            ];
            var result = dynamoDoc.jsValue(value);
            expect(result).to.deep.equal(arr);
        });

        it('should deal with Objects', function() {
            var value = {M: {
                key1: {S: 'a string'},
                key2: {N: '12345'},
                key3: {S: 'another string'},
                key4: {BOOL: false},
                key5: {NULL: true},
                key6: {M: {
                    nestedKey: {M: {
                        anotherLevel: {S: 'with a string'}
                    }}
                }}
            }};
            var obj = {
                key1: 'a string',
                key2: 12345,
                key3: 'another string',
                key4: false,
                key5: null,
                key6: {
                    nestedKey: {
                        anotherLevel: 'with a string'
                    }
                }
            };
            var result = dynamoDoc.jsValue(value);
            expect(result).to.deep.equal(obj);
        });

        it('should deal with numeric sets', function() {
            var value = {NS: [
                '1',
                '2',
                '123'
            ]};
            var numSet = new Set([1, 2, 123]);
            var result = dynamoDoc.jsValue(value);
            expect(result).to.an.instanceOf(Set);
            numSet.forEach(function(elem) {
                expect(result.has(elem)).to.be.true;
            });
        });

        it('should deal with string sets', function() {
            var value = {SS: [
                'one',
                'two',
                'one hundred twenty three'
            ]};
            var numSet = new Set(['one', 'two', 'one hundred twenty three']);
            var result = dynamoDoc.jsValue(value);
            expect(result).to.an.instanceOf(Set);
            numSet.forEach(function(elem) {
                expect(result.has(elem)).to.be.true;
            });
        });
    });

    describe('#jsToDynamo(doc, callback)', function() {

        it('should be able to convert a simple object', function(done) {

            var json = {someKey: "some value"};
            var dynamo = {someKey: {S: "some value"}};

            dynamoDoc.jsToDynamo(json, function(err, data) {
                expect(err).to.be.null;
                expect(data).to.deep.equal(dynamo);
                done();
            });
        });

        it('should be able to convert an object with multiple value types', function(done) {

            var json = {
                keyForString: "some value",
                keyForNumber: 1234,
                keyForBooleanTrue: true,
                keyForBooleanFalse: false,
                keyForNull: null,
                keyForArray: [1, 2, '3', '4', null],
                keyForObject: { nested: { level: [false, 'string']}},
                keyForNumericSet: new Set([1, 2, 3]),
                keyForStringSet: new Set(['some', 'string', 'here'])
            };

            var dynamo = {
                keyForString: {S: "some value"},
                keyForNumber: {N: "1234"},
                keyForBooleanTrue: {BOOL: true},
                keyForBooleanFalse: {BOOL: false},
                keyForNull: {NULL: true},
                keyForArray: {L:
                    [{N: '1'}, {N: '2'}, {S: '3'}, {S: '4'}, {NULL: true}]
                },
                keyForObject: {M: {
                    nested: {M: {
                        level: {L:
                            [{BOOL: false}, {S: 'string'}]
                        }
                    }}
                }},
                keyForNumericSet: {NS:
                    ['1', '2', '3']
                },
                keyForStringSet: {SS:
                    ['some', 'string', 'here']
                }
            };

            dynamoDoc.jsToDynamo(json, function(err, data) {
                expect(err).to.be.null;
                expect(data).to.deep.equal(dynamo);
                done();
            });
        });
    });

    describe('#dynamoToJs(dynamo, callback)', function() {

        it('should be able to convert a simple object', function(done) {

            var dynamo = {someKey: {S: "some value"}};
            var json = {someKey: "some value"};

            dynamoDoc.dynamoToJs(dynamo, function(err, data) {
                expect(err).to.be.null;
                expect(data).to.deep.equal(json);
                done();
            });
        });

        it('should be able to convert an object with multiple value types', function(done) {

            var dynamo = {
                keyForString: {S: "some value"},
                keyForNumber: {N: "1234"},
                keyForBooleanTrue: {BOOL: true},
                keyForBooleanFalse: {BOOL: false},
                keyForNull: {NULL: true},
                keyForArray: {L:
                    [{N: '1'}, {N: '2'}, {S: '3'}, {S: '4'}, {NULL: true}]
                },
                keyForObject: {M: {
                    nested: {M: {
                        level: {L:
                            [{BOOL: false}, {S: 'string'}]
                        }
                    }}
                }},
                keyForNumericSet: {NS:
                    ['1', '2', '3']
                },
                keyForStringSet: {SS:
                    ['some', 'string', 'here']
                }
            };

            var json = {
                keyForString: "some value",
                keyForNumber: 1234,
                keyForBooleanTrue: true,
                keyForBooleanFalse: false,
                keyForNull: null,
                keyForArray: [1, 2, '3', '4', null],
                keyForObject: { nested: { level: [false, 'string']}},
                keyForNumericSet: new Set([1, 2, 3]),
                keyForStringSet: new Set(['some', 'string', 'here'])
            };

            dynamoDoc.dynamoToJs(dynamo, function(err, data) {
                expect(err).to.be.null;
                expect(data).to.deep.equal(json);
                json.keyForNumericSet.forEach(function(elem) {
                    expect(data.keyForNumericSet.has(elem)).to.be.true;
                });
                json.keyForStringSet.forEach(function(elem) {
                    expect(data.keyForStringSet.has(elem)).to.be.true;
                });
                done();
            });
        });
    });
});
