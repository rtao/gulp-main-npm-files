'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var mainNpmFiles = require('npm-main-files');
var fs = require('fs');
var path = require('path');

function getNpmFolder(base) {
    return 'node_modules/';
}

module.exports = function (filter, callback) {
    return through.obj(function (file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new PluginError('gulp-npm-main-files', 'Streams are not supported!'));
            return cb();
        }
        
        if (file.isBuffer()) {
            var npmFolder = getNpmFolder();
            
            if (typeof filter === 'function') {
                callback = filter;
                filter = null;
            }
            
            var fileNames = mainNpmFiles(filter);
            
            fileNames.forEach(function (filename) {
                var newFile = file.clone();
                newFile.path = filename;
                newFile.contents = fs.readFileSync(newFile.path);
                this.push(newFile);
            }, this);
            
            cb();
        }
    });
}