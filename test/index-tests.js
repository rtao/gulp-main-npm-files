'use strict';

var gulp = require('gulp');
var mainNpmFiles = require('../index');
var streamAssert = require('stream-assert');
var assert = require('assert');

describe('gulp-main-npm-files', function () {
    it('is a function', function () {
        assert.equal(typeof mainNpmFiles, 'function');
    });

    
});