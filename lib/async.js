exports.forEach = function(array, eachCallback, completeCallback) {
    var i = 0;

    var next = function() {
        i++;
        if (i < array.length) {
            eachCallback(array[i], next);
        }
        else {
            completeCallback();
        }
    };

    eachCallback(array[i], next);
};
