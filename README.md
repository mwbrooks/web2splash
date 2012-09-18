# web2splash

> A PhoneGap splash screen generator using an HTML document as a template.

[![Build Status][travis-ci-img]][travis-ci-url]

## About

Web2Splash will generate every splash screen for every PhoneGap platform.

A splash screen is the startup image displayed while your PhoneGap application
loads. Since the image needs to match the device's screen size, you typically
need to create multiple images for each platform. Even more annoying is that
most platforms have devices with different screen aspect-ratios. This means
a simple image resize will not cut it.

Rather than creating a large master image that is cropped, it makes more sense
to use a responsive HTML document. As PhoneGap developer, you've already
created a responsive HTML web application. It makes sense to reuse your skills
to create the splash screens.

This tool reads in an HTML document into a headless Webkit browser, resizes
the viewport to each splash screen size, and then renders an image.

## Supported Platforms

- Android
- Bada
- BlackBerry
- iOS
- webOS
- Windows Phone

## Install

1. [Download and Install PhantomJs](http://phantomjs.org/)
    - `ln -s /path/to/download/bin/phantomjs /usr/local/bin/phantomjs`
2. `npm install web2splash`
    - Command-Line: `npm install -g web2splash`
    - Node.js: Add `web2splash` to your `package.json`

## Usage

### Command-Line

    $ web2splash --help
    $ web2splash http://example.com/
    $ web2splash path/to/template.html path/to/output/dir

### node.js

    var web2splash = require('web2splash');

    web2splash.onRenderImage = function(image) {
        // image.name, image.width, image.height
    };

    web2splash.render(input, output, function(e) {
        // done
    });

[travis-ci-img]: https://secure.travis-ci.org/mwbrooks/web2splash.png
[travis-ci-url]: http://travis-ci.org/mwbrooks/web2splash

