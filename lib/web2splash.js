exports.render = function(input, output, callback) {
    var images = [
        { name: 'android-ldpi-portrait.png', format: 'png', width: 240, height: 480 }
    ];

    for(var i = 0, l = images.length; i < l; i++) {
        this.onRenderImage(images[i]);
    }

    callback(undefined, images);
};

exports.onRenderImage = function(image) {
    // stub to be overridden by user
};
