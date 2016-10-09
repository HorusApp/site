'use strict';

module.exports = function( gulp, $, args ) {
  function task() {
    return gulp.src( PATHS.file.src.svgs )
      .pipe( $.svgstore( {
        inlineSvg: true
      } ) )
      .pipe( gulp.dest( PATHS.dir.public.images ) )
      .on( 'error', $.util.log );
  }

  return {
    dependencies: [ 'clean:svgs' ],
    fn: task
  };
};
