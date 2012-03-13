
### Basic Usage

```javascript
var done = waitress(count, [error = ''], [dieEarly = false], cb);
```

Waitress returns a function, `done`, that will wait to be called `count` times before executing the `cb` passed into it.

If an `error` is provided and `done` is called with `false` as it's first argument, then `error` will be passed into `callback`.

If `dieEarly` is set to true, waitress will call callback on the first
error, otherwise it will wait for all callbacks to finish and call `cb`
with the last error it received.

```javascript
var done = waitress(3, 'your error', function(err) {
  if (err) throw err;
});

done();
done();
done(false); // causes callback to be fired with an error condition
```

### Getting results

If done receives a second parameter, waitress will add that to an array,
which will be the second parameter given to the callback, as long as it
receives no errors.

The array will be built in the order the data is received, not the order
done appears in your code.

```javascript
var done = waitress(3, function(err, result) {
  if (err) throw err;
  result === ['a', 'b', 'c'];
});

done(null, 'a');
done(null, 'b');
done(null, 'c');
```
