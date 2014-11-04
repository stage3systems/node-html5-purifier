'use strict';
process.env.TZ = 'UTC';
var path = require('path');

/**
 * Test Globals.
 */

var rootDir = path.join(__dirname, '/..');
var appDir = path.join(rootDir, 'lib');
var testDir = path.join(rootDir, 'test');

// dependencies
global.expect = require('expect.js');
global.sinon = require('sinon');

// app paths
global.APP_DIR = rootDir;
global.LIB_DIR = appDir;

// test paths
global.FIXTURES_DIR = path.join(testDir, 'fixtures');
global.TEST_HELPER_DIR = path.join(testDir, 'helper');
