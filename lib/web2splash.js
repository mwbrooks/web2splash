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
 *         - `images` {Array} is an array of image objects.
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

    var images = [
        { name: 'android-ldpi-portrait.png', width: 240, height: 480 }
    ];

    for (var i = 0, l = images.length; i < l; i++) {
        this.onRenderImage(images[i]);
    }

    callback(null, images);
};

exports.onRenderImage = function(image) {
    // stub to be overridden by user
};
