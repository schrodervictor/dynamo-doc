'use strict';

var expect = require('chai').expect;

var dynamoDoc = require('../lib/dynamo-doc');

describe('Dynamo Doc (syncronous calls)', function() {

    describe('#jsToDynamo(json) - syncronous', function() {

        it('should should give the same result in a syncronous call', function() {
            var json = {
                "some-key": "some value",
                "another-key": 12345
            };

            var dynamo = {
                "some-key": { "S": "some value" },
                "another-key": { "N": "12345" }
            };

            var result = dynamoDoc.jsToDynamo(json);
            expect(result).to.deep.equal(dynamo);
        });
    });

    describe('#dynamoToJs(dynamo) - syncronous', function() {

        it('should should give the same result in a syncronous call', function() {
            var dynamo = {
                "some-key": { "S": "some value" },
                "another-key": { "N": "12345" }
            };

            var json = {
                "some-key": "some value",
                "another-key": 12345
            };


            var result = dynamoDoc.dynamoToJs(dynamo);
            expect(result).to.deep.equal(json);
        });
    });
});
