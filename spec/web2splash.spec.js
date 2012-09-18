
describe('web2splash', function() {
    var web2splash;

    describe('render', function() {
        beforeEach(function() {
            web2splash = require('../lib/web2splash');
            spyOn(web2splash, '_renderImages').andCallFake(function(input, output, callback) {
                callback(null, web2splash.images);
            });
        });

        it('should require the input parameter', function(done) {
            web2splash.render(null, 'path/to/output', function(e, images) {
                expect(e).toBeDefined();
                done();
            });
        });

        it('should require the output parameter', function(done) {
            web2splash.render('path/to/input', null, function(e, images) {
                expect(e).toBeDefined();
                done();
            });
        });

        it('should not require the callback parameter', function(done) {
            web2splash.render('path/to/input', 'path/to/output');
            expect(true).toBeTruthy();
            done();
        });

        it('should render all of the images', function(done) {
            web2splash.render('path/to/input', 'path/to/output', function(e, images) {
                expect(e).toBeNull();
                expect(images.length).toEqual(web2splash.images.length);
                done();
            });
        });
    });
});
