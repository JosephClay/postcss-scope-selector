var postcss = require('postcss');
var trimLeft = require('./trimLeft');

var checker = function(sel) {
    return function(selectorStr) {
        return selectorStr.indexOf(sel) !== -1;
    };
};

var scoper = function(pre, sel) {
    return function(selectorStr) {
        if (selectorStr.indexOf(sel) === -1) { return selectorStr; }
        return pre + ' ' + trimLeft(selectorStr);
    };
};

var scopeSelector = function(defaultPrefix, defaultSelector) {
    return function(prefix, selector) {
        var scope = scoper(
            prefix || defaultPrefix,
            selector || defaultSelector
        );
        var selectorCheck = checker(selector || defaultSelector);
        var commaCheck = checker(',');

        return function(css) {
            css.walkRules(function(rule) {
                var ruleSelector = rule.selector;
                if (!ruleSelector || !selectorCheck(ruleSelector)) { return; }

                rule.selector = commaCheck(ruleSelector) ?
                    ruleSelector.split(',').map(scope).join(', ') :
                    scope(ruleSelector);
            });
        };
    };
};

module.exports = postcss.plugin('scopeSelector', scopeSelector('.no-touchevents', ':hover'));
