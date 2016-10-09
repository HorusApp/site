'use strict';

var runSequence = require( 'run-sequence' );

module.exports = function( gulp, $, args ) {
  var taskName,
      tasks = [
        'scripts',
        'styles'
      ];

  tasks.forEach( function( task ) {
    taskName = 'revision:' + task;

    gulp.task( taskName, function() {
      return rev( task );
    } );
  } );

  function rev( taskName ) {
    return gulp.src( PATHS.file.public[ taskName ] )
      .pipe( $.rev() )
      .pipe( gulp.dest( PATHS.dir.public[ taskName ] ) )
      .pipe( $.revNapkin( {
        verbose: false
      } ) )
      .pipe( $.rev.manifest( {
        base: PATHS.dir.public.base,
        path: PATHS.dir.public.base + 'rev-manifest.json',
        merge: true
      } ) )
      .pipe( gulp.dest( PATHS.dir.public.base ) );
  }

  return function( cb ) {
    if ( ENV !== 'prod' ) {
      cb();
      return;
    }

    runSequence(
      'revision:scripts',
      'revision:styles',
      cb
    );
  };
};
