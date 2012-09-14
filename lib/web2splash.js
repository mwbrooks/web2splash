var path = require('path');
var async = require('./async');

/*
 * render(input, output, [callback)]
 *
 * Renders each splash screen image using an HTML document template.
 *
 * Parameters:
 *
 *     - `input` {String} is the file path to the HTML document.
 *     - `output` {String} is the path to the output directory.
 *     - `callback` {Function} is called after the rendering is completed.
 *         - `e` {Error} is an `Error` object otherwise `null`.
 *         - `images` {Array} is an array of rendered images.
 *
 *             [
 *                 { name: 'android-ldpi-portrait.png', width: 240, height: 480 },
 *                 { name: 'android-mdpi-portrait.png', width: 480: height: 800 }
 *             ]
 */
exports.render = function(input, output, callback) {
    callback = callback || function() {};

    if (!input) {
        return callback(new Error('Missing input path argument.'));
    }

    if (!output) {
        return callback(new Error('missing output path argument.'));
    }

    this.renderWithPhantomJs(input, output, callback);
};

/*
 * renderWithPhantomJs(input, output, callback)
 */
exports.renderWithPhantomJs = function(input, output, callback) {
    /* Create a PhantomJS browser instance called `page`. */
    require('node-phantom').create(function(e, phantom) {
        phantom.createPage(function(e, page) {
            /*
             * Open a new page to the input HTML document. A new page should
             * be opened for each splash screen, otherwise temporal data
             * (e.g. CSS animations) may be carried between each splash screen.
             */
            async.forEach(
                exports.images,
                /* 
                 * For each image:
                 *     - resize the page viewport to the splash screen size
                 *     - open the page to the HTML template
                 *     - render the page to an image file
                 *     - iterate to the `next()` image
                */
                function(image, next) {
                    /* set viewport */
                    page.viewportSize = { width: image.width, height: image.height };

                    /* open page */
                    page.open(input, function(e, status) {
                        if (status !== 'success') {
                            return callback(new Error('Could not open', input));
                        }

                        /* wait a bit then render the image */
                        setTimeout(function () {
                            var filepath = path.join(output, image.name);
                            page.render(filepath, function(e) {
                                exports.onRenderImage(image);
                                next();
                            });
                        }, 200);
                    });
                },
                /* After looping over all of the images, return with `callback(...)`. */
                function(e) {
                    return callback(null, exports.images);
                }
            );
        });
    });
};

/*
 * onRenderImage(image)
 *
 * A callback function that is called after each image has been rendered.
 * The default action does nothing, but a user can override it.
 */
exports.onRenderImage = function(image) {
};

/*
 * The splash screens to render as images.
 */
exports.images = [
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
