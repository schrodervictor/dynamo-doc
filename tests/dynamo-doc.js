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
    });
});
