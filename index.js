"use strict";

var argue = require('argue');

var waitress = function(/* count, [error = ''], [dieEarly = false], cb */) {
  var sig = argue(arguments);

  var count, error, dieEarly, cb;

  dieEarly = false;
  error = '';

  switch (sig) {
    case 'nebf':
    case 'nsbf':
      count = arguments[0];
      error = arguments[1];
      dieEarly = arguments[2];
      cb = arguments[3];
      break;

    case 'nef':
    case 'nsf':
      count = arguments[0];
      error = arguments[1];
      cb = arguments[2];
      break;

    case 'nbf':
      count = arguments[0];
      dieEarly = arguments[1];
      cb = arguments[2];
      break;

    case 'nf':
      count = arguments[0];
      cb = arguments[1];
      break;

    default:
      throw new Error("waitress: could not parse parameters.");
  }
  if (typeof error === "string") {
    error = new Error(error);
  }

  if (count === 0) {
    cb(null);
    return function(){};
  }

  var done = 0;
  var cberr = null;
  var results = [];
  var args;
  var next = (function(err, result) {
    ++done;
    if (err instanceof Error) {
      if (dieEarly) {
        cb(err);
        cb = function(){};
      } else {
        cberr = err;
      }
    } else if (err === false) {
      cberr = error;
    }
    if (result) {
      results.push(result);
    }
    if (done === count) {
      args = [cberr];
      if (results.length) {
        args.push(results);
      }
      cb.apply(null, args);
    }
  });
  return next;
};

module.exports = waitress;
