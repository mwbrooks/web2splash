describe('async', function() {
    var async = require('../lib/async');

    describe('forEach', function() {
        it('should asynchronously iterate over each array element', function(done) {
            var a = ['a', 'b', 'c', 'd'];
            var b = [];

            async.forEach(
                a,
                function(element, next) {
                    b.push(element);
                    next();
                },
                function() {
                    expect(a).toEqual(b);
                    done();
                }
            );
        });
    });
});
