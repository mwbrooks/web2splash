/**
 * forEach(array, eachCallback, completeCallback)
 *
 * Asynchronously iterate an array using the style of `forEach`.
 *
 * Parameters:
 *     - `array` {Array} is the array of elements to iterate
 *     - `eachCallback` {Function} is called for each element and passed the
 *        array element and the next function callback.
 *
 *         endCallback(element, next)
 *
 *         Callback for each element in the array.
 *
 *         Parameters:
 *             - `element` {Object} is an element in the array
 *             - `next` {function} is the callback to iterate on the next element.
 *
 *     - `completeCallback` {Function} is callback when all elements have been
 *       iterated.
 */
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
