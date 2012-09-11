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

var splashscreens = [
    { name: 'android-ldpi-landscape.png',  width: 320,  height: 200  },
    { name: 'android-ldpi-portrait.png',   width: 200,  height: 320  },
    { name: 'android-mdpi-landscape.png',  width: 480,  height: 320  },
    { name: 'android-mdpi-portrait.png',   width: 320,  height: 480  },
    { name: 'android-hdpi-landscape.png',  width: 800,  height: 480  },
    { name: 'android-hdpi-portrait.png',   width: 480,  height: 800  },
    { name: 'android-xhdpi-landscape.png', width: 1280, height: 720  },
    { name: 'android-xhdpi-portrait.png',  width: 720,  height: 1280 },
    { name: 'bada-portrait.png',           width: 480,  height: 800  },
    { name: 'bada-wac-type3-portrait.png', width: 320,  height: 480  },
    { name: 'bada-wac-type4-portrait.png', width: 480,  height: 800  },
    { name: 'bada-wac-type5-portrait.png', width: 240,  height: 400  },
    { name: 'blackberry-universal.png',    width: 225,  height: 225  },
    { name: 'ios-iphone-1x-landscape.png', width: 480,  height: 320  },
    { name: 'ios-iphone-1x-portrait.png',  width: 320,  height: 480  },
    { name: 'ios-iphone-2x-landscape.png', width: 960,  height: 640  },
    { name: 'ios-iphone-2x-portrait.png',  width: 640,  height: 960  },
    { name: 'ios-ipad-1x-landscape.png',   width: 1024, height: 783  },
    { name: 'ios-ipad-1x-portrait.png',    width: 768,  height: 1004 },
    { name: 'ios-ipad-2x-landscape.png',   width: 2008, height: 1536 },
    { name: 'ios-ipad-2x-portrait.png',    width: 1536, height: 2008 },
    { name: 'webos-universal.png',         width: 64,   height: 64   },
    { name: 'windows-phone-portrait.jpg',  width: 480,  height: 800  }
];

// Load the HTML document as a webpage.

var page = require('webpage').create();

page.renderEachSplashScreen = function() {
        var splashscreen = splashscreens.pop();

        if (!splashscreen) {
            phantom.exit();
        }

        page.viewportSize = {
            width:  splashscreen.width,
            height: splashscreen.height
        };

        window.setTimeout(function () {
            console.log('render =>', splashscreen.name, '(', splashscreen.width, 'px x', splashscreen.height, 'px)');
            page.render(splashscreen.name);
            page.renderEachSplashScreen();
        }, 200);
};

page.open(uri, function (status) {
    if (status !== 'success') {
        console.log('Error: "', url, '" could not be opened as a webpage.');
        phantom.exit();
    }

    page.renderEachSplashScreen();
});
