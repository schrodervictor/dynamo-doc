'use strict';
var genericCallback = require('./generic-callback');

var dynamoValue = module.exports.dynamoValue = function(value) {

    var result;

    if (typeof value === 'undefined' || value === null) result = {NULL: true};
    else if (true === value || false === value) result = {BOOL: value};
    else if (typeof value === 'string') result = {S: value};
    else if (typeof value === 'number') result = {N: '' + value};
    else if (Array.isArray(value)) result = {L: value.map(dynamoValue)};
    else if (value instanceof Set) {
        var tempArray = [];
        var setType;
        value.forEach(function(elem) {
            setType = setType || typeof elem;
            if (typeof elem === setType) {
                tempArray.push('' + elem);
            }
        });

        if (setType === 'string') {
            result = {SS: tempArray};
        } else if (setType === 'number') {
            result = {NS: tempArray};
        }
    }
    else if (typeof value === 'object') {
        var newObject = {};
        Object.keys(value).forEach(function(key){
            newObject[key] = dynamoValue(value[key]);
        });
        result = {M: newObject};
    }

    return result;
};

var jsValue = module.exports.jsValue = function(value) {

    var result;

    var type = Object.keys(value)[0];

    if ('S' === type) result = value.S;
    else if ('N' === type) result = parseFloat(value.N);
    else if ('BOOL' === type) result = value.BOOL;
    else if ('NULL' === type) result = null;
    else if ('L' === type) result = value.L.map(jsValue);
    else if ('M' === type) {
        var newObject = {};
        Object.keys(value.M).forEach(function(key){
            newObject[key] = jsValue(value.M[key]);
        });
        result = newObject;
    }
    else if ('NS' === type) result = new Set(value.NS.map(parseFloat));
    else if ('SS' === type) result = new Set(value.SS);

    return result;

};

module.exports.jsToDynamo = function(doc, callback) {

    var callback = callback || genericCallback;
    var dynamo = {};

    for (var property in doc) {
        dynamo[property] = dynamoValue(doc[property]);
    }

    return callback(null, dynamo);

};

module.exports.dynamoToJs = function(dynamo, callback) {

    var callback = callback || genericCallback;
    var doc = {};

    for (var property in dynamo) {
        doc[property] = jsValue(dynamo[property]);
    }

    return callback(null, doc);

};
