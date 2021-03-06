'use strict';

//inject new method into lodash object
const _ = require('./dist/cjs/deepdash')(require('lodash'));
//in browser just load script after lodash
//<script src="lodash.js"></script>
//<script src="deepdash.js"></script>
let obj = {
  a: {
    b: {
      c: {
        d: [
          { i: 0 },
          { i: 1 },
          { i: 2 },
          { i: 3 },
          { i: 4 },
          { i: 5 },
          {
            o: {
              d: new Date(),
              f: function() {},
              skip: {
                please: {
                  dont: {
                    go: {
                      here: 'skip it',
                    },
                  },
                },
              },
            },
          },
        ],
        s: 'hello',
      },
      b: true,
    },
    n: 12345,
    u: undefined,
  },
  nl: null,
};
_.eachDeep(obj, (value, key, parent, ctx) => {
  console.log(
    _.repeat('  ', ctx.depth) +
      key +
      ':' +
      (value === null ? 'null' : typeof value),
    ctx.parent.path && ' @' + ctx.parent.path
  );
  if (key == 'skip') {
    return false; //return false explicitly to skip iteration over current value's children
  }
});

// Chaining works too
// _(obj).eachDeep((value, key, path, depth, parent, parentKey, parentPath) => {/* do */}).value();
