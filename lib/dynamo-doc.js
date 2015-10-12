'use strict';

var dynamoValue = module.exports.dynamoValue = function(value) {

    var result;

    if (typeof value === 'undefined' || value === null) result = {NULL: true};
    else if (true === value || false == value) result = {BOOL: value};
    else if (typeof value === 'string') result = {S: value};
    else if (typeof value === 'number') result = {N: '' + value};
    else if (Array.isArray(value)) result = {L: value.map(dynamoValue)};
    else if (typeof value === 'object') {
        var newObject = {};
        Object.keys(value).forEach(function(key){
            newObject[key] = dynamoValue(value[key]);
        });
        result = {M: newObject};
    }

    return result;

};

module.exports.jsToDynamo = function(doc, callback) {

    var dynamo = {};

    for (var property in doc) {
        dynamo[property] = dynamoValue(doc[property]);
    }

    return callback(null, dynamo);

};
