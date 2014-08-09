/**
 * Minimized Script with node and uglify-js
 *
 * info npm install uglify-js
 *      npm install wrench
 */
var fs = require('fs'),
    uglify = require('uglify-js'),
    wrench = require('wrench');

var myArguments = [],
    files = [
        "app/javascript/app.js",
        "app/javascript/utils/utils-dev.js",
        "app/javascript/utils/utils1.js"
    ];

var uglified = uglify.minify(files);
var resultJsCode = '';

console.log("APP started!");

process.argv.forEach(function (val, index, array) {
    myArguments.push(val);
});

function fileToAnonymDeclare() {
	return uglified.code;
	
	//TODO include global function in local  
	//return resultJsCode.concat('(function(){', String(uglified.code), '}());');
}

function startConcat() {
    fs.writeFile('game.min.js', fileToAnonymDeclare(), function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Script generated and saved:", 'game.min.js');

            if (myArguments[myArguments.length - 1] === '-t') {
                // Deep-copy an existing directory
                wrench.copyDirSyncRecursive(__dirname, "L:/", {
                    forceDelete : true							// Whether to overwrite existing directory or not
                    //,excludeHiddenUnix: false 					// Whether to copy hidden Unix files or not (preceding .)
                    //,preserveFiles: true 						// If we're overwriting something and the file already exists, keep the existing
                    //,preserveTimestamps: true 					// Preserve the mtime and atime when copying files
                    // inflateSymlinks: bool, 					// Whether to follow symlinks or not when copying files
                    // filter: regexpOrFunction, 				// A filter to match files against; if matches, do nothing (exclude).
                    // whitelist: true 							// if true every file or directory which doesn't match filter will be ignored
                    // include: regexpOrFunction, 				// An include filter (either a regexp or a function)
                    // exclude: regexpOrFunction 				// An exclude filter (either a regexp or a function)
                });
                console.log('copy finished!');
            }
        }
    });
}

/**
 * START app
 * */
startConcat();