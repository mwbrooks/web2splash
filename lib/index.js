// On startup, check the command-line arguments.
// The first argument must be a URI to an HTML document. This is the template
// for rendering each splash screen.

var help = [
    'NAME',
    '    screenwriter -- generate splash screens from a HTML document',
    '',
    'SYNOPSIS',
    '    phantomjs screenwriter.js splash.html',
    '',
    'DESCRIPTION',
    '    The screenwriter utility creates splash screen images from a HTML document.',
    '',
    '    The utility supports multiple platforms and splash screens for each one.',
    '    The HTML document is the template from which the images generated. For best',
    '    results, use a responsive layout in the HTML document.'
].join('\n');

if (phantom.args.length !== 1) {
    console.log(help);
    phantom.exit();
}

// Load the HTML document as a webpage.

var page = require('webpage').create();
var url = phantom.args[0];
var platform = {
    'android': {
        'ldpi': {
            'landscape': {},
            'portrait': {}
        },
        'mdpi': {
            'landscape': {},
            'portrait': {}
        },
        'hdpi': {
            'landscape': {},
            'portrait': {}
        },
        'xhdpi': {
            'landscape': {},
            'portrait': {}
        }
    },
    'bada': {
        'portrait': {}
    },
    'bada-wac': {
        type3: {
            portrait: {}
        },
        type4: {
            portrait: {}
        },
        type5: {
            portrait: {}
        }
    },
    blackberry: {
        universal: {
            portrait: {}
        }
    },
    ios: {
        iphone: {
            '1x': {
                portrait: {},
                landscape: {}
            },
            '2x': {
                portrait: {},
                landscape: {}
            }
        },
        ipad: {
            '1x': {
                portrait: {},
                landscape: {}
            },
            '2x': {
                portrait: {},
                landscape: {}
            }
        }
    },
    webos: {
        universal: {
            portrait: {}
        }
    },
    'windows-phone': {
        universal: {
            portrait: {},
            landscape: {}
        }
    }
};

page.viewportSize = { width: 320, height: 480 };

page.open(url, function (status) {
    if (status !== 'success') {
        console.log('Error: "', url, '" could not be opened as a webpage.');
        phantom.exit();
    }

    window.setTimeout(function () {
        page.render('splashscreen.png');
        phantom.exit();
    }, 200);
});

