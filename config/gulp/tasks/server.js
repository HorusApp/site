'use strict';

var browserSync = require( 'browser-sync' ).create(),
    reload = browserSync.reload,
    packageJson = require( ROOT_DIR + 'package.json' );

module.exports = function( gulp, $, args ) {
  return function() {
    browserSync.init( {
      host: packageJson.name + '.dev',
      port: 1337, // Frontend leet port, DEAL with it!
      open: false,
      server: {
        baseDir: PATHS.dir.public.base
      }
    } );

    gulp.watch( PATHS.file.src.styles, [ 'styles', reload ] );
    gulp.watch( PATHS.file.src.scripts, [ 'scripts', reload ] );
    gulp.watch( [
      PATHS.file.src.templates,
      PATHS.file.src.data
    ], [ 'templates', reload ] );
  };
};
