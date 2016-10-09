'use strict';

module.exports = function( gulp, $, args ) {
  function task() {
    return gulp.src( PATHS.dir.assets.styles + 'pages/*.styl' )

      // Development
      .pipe( $.if(
        ENV === 'dev',
        $.plumber()
      ) )
      .pipe( $.sourcemaps.init( { loadMaps: true } ) )

      .pipe( $.stylus( {
        'include css': true
      } ) )
      .on( 'error', $.util.log )

      .pipe( $.autoprefixer() )
      .pipe( $.if(
        ENV === 'dev',
        $.sourcemaps.write( './map/' )
      ) )

      // Production
      .pipe( $.if(
        ENV === 'prod',
        $.minifyCss()
      ) )

      // Dist
      .pipe( gulp.dest( PATHS.dir.public.styles ) );
  }

  return {
    dependencies: [ 'clean:styles' ],
    fn: task
  };
};
