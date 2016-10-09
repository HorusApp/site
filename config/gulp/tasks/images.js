'use strict';

module.exports = function( gulp, $, args ) {
  function task() {
    return gulp.src( PATHS.file.src.images )
      .pipe( $.imagemin() )
      .pipe( gulp.dest( PATHS.dir.public.images ) )
      .on( 'error', $.util.log );
  }

  return {
    dependencies: [ 'clean:images' ],
    fn: task
  };
};
