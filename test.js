
var Parser = require('grammarjs-recursive-parser');
var assert = require('assert');
var grammar = require('./');
var fs = require('fs');

describe('semver', function(){
  describe('pass', function(){
    pass('1.2.3');
    pass('~1.2.3');
    pass('^1.2.3');
    pass('>=1.2.3');
    pass('>1.2.3');
    pass('<=1.2.3');
    pass('<1.2.3');
    pass('^1.2.x');
    pass('1.2.x-beta');
    pass('1.2');
    pass('1');
    pass('1.x');
  });

  describe('fail', function(){
    fail('1.foo');
    fail('!1.2.3');
    fail('-1.2.3');
    fail('!1.2');
    fail('-1.2');
    fail('!1');
    fail('-1');
  });
});

/**
 * Pass.
 *
 * @api private
 */

function pass(str, log) {
  return it(str, function(){
    assert.equal(compile(str, log), str);
  });
}

/**
 * Fail.
 *
 * @api private
 */

function fail(str, log) {
  return it(str, function(){
    assert.notEqual(compile(str, log), str);
  });
}

/**
 * Parse `str` to ast, then stringify back.
 *
 * @param {String} str
 * @return {String}
 */

function compile(str, log) {
  var parser = new Parser(grammar);
  var ast = parser.parse(str);
  if (log) console.log(JSON.stringify(ast, null, 2));
  return stringify(ast);
}

/**
 * For testing, it should generate the original string.
 *
 * @param {Token} token
 * @api public
 */

function stringify(token) {
  if (!token) return '';
  var html = [];

  if (Array.isArray(token.content)) {
    token.content.forEach(function(child){
      html.push(stringify(child));
    });
  } else if (null != token.content) {
    html.push(stringify(token.content));
  } else {
    html.push(token);
  }

  return html.join('');
}