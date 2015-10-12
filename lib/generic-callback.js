'use strict';

module.exports = function genericCallback(err, thing) {
    if (err) throw err;
    return thing;
};
