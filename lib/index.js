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

var uri = phantom.args[0];

// Define the splash screens to render.
// A platform can support multiple splash screen dimensions. However, wisely
// name the keys because they used to generate the name of each image.

var splashscreen = {
    'android': {
        'ldpi': {
            'landscape': { 'width': 320, 'height': 200 },
            'portrait':  { 'width': 200, 'height': 320 }
        },
        'mdpi': {
            'landscape': { 'width': 480, 'height': 320 },
            'portrait':  { 'width': 320, 'height': 480 }
        },
        'hdpi': {
            'landscape': { 'width': 800, 'height': 480 },
            'portrait':  { 'width': 480, 'height': 800 }
        },
        'xhdpi': {
            'landscape': { 'width': 1280, 'height': 720 },
            'portrait':  { 'width': 720,  'height': 1280 }
        }
    },
    'bada': {
        'portrait': { 'width': 480, 'height': 800 }
    },
    'bada-wac': {
        'type3': {
            'portrait': { 'width': 320, 'height': 480 }
        },
        'type4': {
            'portrait': { 'width': 480, 'height': 800 }
        },
        'type5': {
            'portrait': { 'width': 240, 'height': 400 }
        }
    },
    'blackberry': {
        'universal': { 'width': 225, 'height': 225 }
    },
    'ios': {
        'iphone': {
            '1x': {
                'landscape': { 'width': 480, 'height': 320 },
                'portrait':  { 'width': 320, 'height': 480 }
            },
            '2x': {
                'landscape': { 'width': 960, 'height': 640 },
                'portrait':  { 'width': 640, 'height': 960 }
            }
        },
        'ipad': {
            '1x': {
                'landscape': { 'width': 1024, 'height': 783 },
                'portrait':  { 'width': 768, 'height': 1004 }
            },
            '2x': {
                'landscape': { 'width': 2008, 'height': 1536 },
                'portrait':  { 'width': 1536, 'height': 2008 }
            }
        }
    },
    'webos': {
        'universal': { 'width': 64, 'height': 64 }
    },
    'windows-phone': {
        'portrait': { 'width': 480, 'height': 800 }
    }
};

// Load the HTML document as a webpage.

var page = require('webpage').create();
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

