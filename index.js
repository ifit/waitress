"use strict";

var waitress = function(count, cb) {
  if (count === 0) {
    cb(null);
    return function() {};
  }

  var done = 0
    , cberr = null
    , results
    , args;

  var next = (function(err, result) {
    ++done;
    if (err instanceof Error) {
      cberr = err;
    } else if (err === false) {
      cberr = cberr || new Error;
    }
    if (result !== undefined) {
      results = results || []
      results.push(result);
    }
    if (done === count) {
      args = [cberr];
      if (results && results.length) {
        args.push(results);
      }
      cb.apply(null, args);
    }
  });
  return next;
};

module.exports = waitress;
