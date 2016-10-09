'use strict';

var del = require( 'del' );

module.exports = function( gulp, $, args ) {
  var taskName,
      dirs = [
        'images',
        'scripts',
        'sprites',
        'styles',
        'templates'
      ];

  dirs.forEach( function( dir ) {
    taskName = 'clean:' + dir;

    gulp.task( taskName, function( cb ) {
      var path = PATHS.dir.public[ dir ];

      path = path ? path : PATHS.file.public[ dir ];

      return del( path, cb );
    } );
  } );

  return function( cb ) {
    return del( PATHS.dir.public.base, cb );
  };
};
