
/**
 * Module dependencies.
 */

var punctuation = require('grammarjs-punctuation');
var Grammar = require('grammarjs-grammar');

/**
 * Initialize the Semver grammar.
 */

var grammar = new Grammar('semver')
  .use(punctuation());

/**
 * Simplify our rule building DSL.
 */

var rule = grammar.rule;

/**
 * Expose `grammar`.
 */

module.exports = grammar;

/**
 * Start.
 */

rule('semver')
  .match(
    ':operator?',
    ':version');

rule('version')
  .match('$:3')
  .match('$:2')
  .match('$:1');

rule('3')
  .match(
    ':character.major',
    ':punctuation.period',
    ':character.minor',
    ':punctuation.period',
    ':character.patch',
    ':release?');

rule('2')
  .match(
    ':character.major',
    ':punctuation.period',
    ':character.minor');

rule('1')
  .match(
    ':character.major');

rule('character.major')
  .match(/\d+/)
  .match('*')
  .match('x');

rule('character.minor')
  .match(/\d+/)
  .match('*')
  .match('x');

rule('character.patch')
  .match(/\d+/)
  .match('*')
  .match('x');

rule('operator')
  .match('^')
  .match('~')
  .match('>=')
  .match('>')
  .match('<=')
  .match('<');

rule('release'); // TODO