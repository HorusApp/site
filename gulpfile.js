'use strict';

/* Get task flags
  =========================================================================== */

var args = require( 'yargs' ).argv;

/* Define global vars
  =========================================================================== */

global.ROOT_DIR = __dirname + '/';
global.APP_DIR = __dirname + '/app/';
global.CONFIG_DIR = __dirname + '/config/gulp/';
global.PATHS = require( CONFIG_DIR + 'paths' );

/* Set enviroment
  =========================================================================== */

global.ENV = args.env || 'dev';

/* Load all gulp plugins
  =========================================================================== */

var gulp = require( 'gulp' ),
    plugins = require( 'gulp-load-plugins' )(),
    requireDir = require( 'require-dir' ),
    runSequence = require( 'run-sequence' ),
    tasks = requireDir( CONFIG_DIR + 'tasks/' );

/* Load and register all splited tasks
  =========================================================================== */

function getTask( task ) {
  return require( CONFIG_DIR + 'tasks/' + task )( gulp, plugins, args );
}

for ( var task in tasks ) {
  var _task = getTask( task );

  if ( typeof _task === 'object' ) {
    gulp.task(task, _task.dependencies, _task.fn );
  } else {
    gulp.task( task, _task );
  }
}

/* Register dev tasks
  =========================================================================== */

gulp.task( 'build', function( cb ) {
  runSequence(
    'clean',
    [
      'images',
      'sprites',
    ],
    [
      'scripts',
      'styles',
    ],
    'revision',
    'templates',
    cb
  );
} );

gulp.task( 'dev', function( cb ) {
  runSequence(
    'build',
    'server',
    cb
  );
} );

gulp.task( 'default', [ 'build' ] );
