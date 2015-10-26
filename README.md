# PostCSS ScopeSelector

[PostCSS] plugin to prefix selector with a scope if matched selector exists. Current main use is to prefix `:hover`
selectors with [modernizr's](http://modernizr.com/) `.no-touchevents` class to prevent hover effects from affecting
touch devices.

[PostCSS]: https://github.com/postcss/postcss

```css
/* Input example */
.foo:hover {}
```

```css
/* Output example */
.no-touchevents .foo:hover {}
```

## Usage

```js
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var scopeSelector = require('postcss-scope-selector');

gulp.task('css', function() {
    var prefix = '.no-touchevents';
    var selector = ':hover';

    return gulp.src('./styles.css')
        .pipe( postcss([ scopeSelector(prefix, selector) ]) )
        .pipe(gulp.dest('./'));
});
```

See [PostCSS] docs for examples for your environment.
