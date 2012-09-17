# Web2Splash

> PhoneGap splash screen generate using an HTML template.

## About

Web2Splash will generate every splash screen for every platform that is supported
by PhoneGap. All you need to do is provide a responsive HTML document that will
rendered at each splash screen's resolution.

A splash screen is the startup image displayed while your PhoneGap application
loads. Since the image needs to match the device's screen size, you typically
need to create multiple images for each platform. Unfortunately, many device
screen's have different aspect ratios, so a simple image resize will not be
effective.

Rather than creating a master image that is cropped, it makes sense to use a
responsive HTML document. If you're a PhoneGap developer, then you've already
created a responsive HTML web application. It makes sense to reuse your skills
to create the splash screen.

## Supported Splash Screens

- Android
- Bada
- BlackBerry
- iOS
- webOS
- Windows Phone

## Install

1. PhantomJs
    - [Download and install](http://phantomjs.org/)
2. `phantomjs`
    - Unless you used brew, you will need to symlink the `phantomjs` binary
    - `ln -s /path/to/download/bin/phantomjs /usr/local/bin/phantomjs`
    - `which phantomjs` should return `/user/local/bin/phantomjs`
3. Install Web2Splash
    - Command-Line: `npm install -g phonegap-tool-web2splash`
    - Node.js: Add `phonegap-tool-web2splash` to your `package.json`

## Usage

### Command-Line

    $ web2splash --help

    $ web2splash path/to/template.html path/to/output/dir

### node.js

    var web2splash = require('web2splash');

    web2splash.onRenderImage = function(image) {
        // image.name, image.width, image.height
    };

    web2splash.render(input, output, function(e) {
        // done
    });

## Development

### Source Code

    $ git clone https://github.com/mwbrooks/phonegap-tool-web2splash.git
    $ cd phonegap-tool-web2splash/
    $ npm install

### Running Tests

    $ npm test

