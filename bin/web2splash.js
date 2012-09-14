#!/usr/bin/env node

/*
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');
var program = require('commander');
var web2splash = require('./../lib/web2splash');

/*
 * Load package.json
 */

var packageJSON = JSON.parse(fs.readFileSync(path.join(__dirname,'..','package.json'), 'utf8'));

/*
 * Command-line usage
 */

program
    .version(packageJSON.version)
    .usage('[options] <input html>')
    .option('-o, --output [path]', 'set output path for images', './');

/*
 * Command-line help
 */

program.on('--help', function(){
    console.log('  Examples:');
    console.log('');
    console.log('    $', program.name, '/path/to/splash.html');
    console.log('');
});

/*
 * Parse the command-line
 */

program.parse(process.argv);
program.input = program.args[0];

if (!program.input) {
    console.log('');
    console.log('Error: <input html> must be provided.');
    console.log('');
    process.exit();
}

/*
 * Render an HTML document to a set of splash screen images
 */

web2splash.onRenderImage = function(image) {
    console.log('  rendered: %s (%d x %dpx)', image.name, image.width, image.height);
};

web2splash.render(program.input, program.output, function(e, images) {
    process.exit();
});
