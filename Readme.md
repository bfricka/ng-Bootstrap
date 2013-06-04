## ng-Bootstrap

### Overview

This is just my boilerplate amalgamation for creating responsive single page apps.  It's a beautiful way to start things out right! I recently removed CoffeeScript from this repository. For the CoffeeScript version [go here](https://github.com/brian-frichette/ng-Bootstrap-Coffee).

### What's Inside?

* Base template: [Twitter Bootstrap](http://twitter.github.com/bootstrap/) with [LESS](http://lesscss.org/)
* MVC / Horsepower: [AngularJS](http://angularjs.org/)
* Library Support:
    * [jQuery](http://jquery.com/)
    * [Lodash](http://lodash.com/)
    * [Amplify.store](http://amplifyjs.com)
* Feature detects: A stripped down version of [Modernizr](http://modernizr.com/download/#-fontface-backgroundsize-borderradius-boxshadow-opacity-rgba-textshadow-cssanimations-generatedcontent-cssgradients-csstransforms-csstransforms3d-csstransitions-hashchange-history-input-inputtypes-localstorage-sessionstorage-shiv-mq-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-css_backgroundsizecover-css_boxsizing-css_lastchild-json-load)
* Angular App structure for JavaScript
* [Grunt](http://gruntjs.com/) build tasks.

### Building

Since 0.1.0, I added grunt instead of Codekit for added power and flexibility.  This allows you to lint your JS, run unit tests, compile LESS, etc. through a watcher, along with a production task.

1. Install Node.js and then `npm install -g grunt-cli` to get Grunt going.
2. In the app base directory: `npm install` to get the dependencies.
3. Run / customize the desired Grunt tasks:
  * `grunt -h` to view available tasks.
  * `grunt watch` to start the watcher for LESS / JS/ Tests
  * The default task `grunt` will build for production.

### Current Versions

* Bootstrap 2.3.2
* AngularJS 1.1.5
* jQuery 1.10.1
* Lodash 1.2.1
* Amplify.store 1.1.0
* Modernizr 2.6.2