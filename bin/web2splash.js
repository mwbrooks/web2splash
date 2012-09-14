#!/usr/bin/env node

/*
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');
var program = require('commander');
//var web2splash = require('./../lib/web2splash');

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
    .option('-v, --version',                 'output the version number')
    .option('-f, --format <type>',           'set splash screen image format as: png, jpg, or gif')
    .option('-v, --viewport <width,height>', 'set browser viewport size')
    .option('-o, --output <path>',           'set image output path');

/*
 * Command-line help
 */

program.on('--help', function(){
    console.log('  Examples:');
    console.log('');
    console.log('    Render all supported splash screen images:');
    console.log('');
    console.log('    $', program.name, '/path/to/splash.html');
    console.log('');
    console.log('    Render one PNG image of 480x800px:');
    console.log('');
    console.log('    $', program.name, '/path/to/splash.html --format=png --viewport=480x800');
    console.log('');
});

program.parse(process.argv);
