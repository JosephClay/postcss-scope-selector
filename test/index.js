var tape = require('tape');
var postcss = require('postcss');
var scopeif = require('../src/');

var transform = function(css) {
    return postcss(scopeif()).process(css).css;
};

tape('postcss-selector-not', function(t) {
    t.equal(
        transform(':hover {}'),
        '.no-touchevents :hover {}',
        'should transform simple :hover'
    );

    t.equal(
        transform('.hi:hover {}'),
        '.no-touchevents .hi:hover {}',
        'should transform simple class :hover'
    );

    t.equal(
        transform('div:hover {}'),
        '.no-touchevents div:hover {}',
        'should transform simple element :hover'
    );

    t.equal(
        transform('div#foo.bar:not(a):nth-child(4n):before:hover {}'),
        '.no-touchevents div#foo.bar:not(a):nth-child(4n):before:hover {}',
        'should transform complex selector :hover'
    );

    t.equal(
        transform('body div:hover .foo:hover {}'),
        '.no-touchevents body div:hover .foo:hover {}',
        'should transform multiple :hover selector'
    );

    t.equal(
        transform('body div:hover, body .foo:hover {}'),
        '.no-touchevents body div:hover, .no-touchevents body .foo:hover {}',
        'should transform multiple selectors'
    );

    t.equal(
        transform('body div, body .foo:hover {}'),
        'body div, .no-touchevents body .foo:hover {}',
        'should transform single selector in multiple selectors'
    );

    t.equal(
        transform('body div,     body .foo:hover {}'),
        'body div, .no-touchevents body .foo:hover {}',
        'should correctly handle whitespace'
    );

    t.end();
});
