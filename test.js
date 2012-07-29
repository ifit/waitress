var waitress = require('./index')
  , assert = require('assert');

assert.throws(function() {
  var done = waitress(3, function(err) {
    if (err) throw err;
  });

  done();
  done();
  done(false);
});

assert.throws(function() {
  var done = waitress(1, function(err) {
    if (err) throw err;
  });

  done(new Error('hai tai mai shu'));
}, /hai tai mai shu/);

// for zero args
assert.throws(function() {
  var done = waitress(0, function(err) {
    throw(new Error("zero args hurrr"));
  });
}, /zero args hurrr/);

assert.doesNotThrow(function() {
  var done = waitress(3, function(err) {
    if (err) throw err;
  });

  done();
  done();
  done();
  done(false);
});

assert.throws(function() {
  var done = waitress(3, function(err, results) {
    if (err) throw err;
  });

  done();
  done(new Error("nein nein nein"));
  done(new Error("no no no"));
}, /no no no/);

(function() {
  var done = waitress(3, function(err, results) {
    if (err) throw err;
    assert.deepEqual(results, [1, 2, 3], "results aggregation wrong");
  });

  done(null, 1);
  done(null, 2);
  done(null, 3);
  done(null, 4);
})();

console.log("No errors thrown, all tests must have passed.");

