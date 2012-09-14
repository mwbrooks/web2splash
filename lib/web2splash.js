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

    for (var i = 0, l = images.length; i < l; i++) {
        this.onRenderImage(images[i]);
    }

    callback(null, images);
};

exports.onRenderImage = function(image) {
    // stub to be overridden by user
};

/*
 * The splash screens to render as images.
 */
var images = [
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
