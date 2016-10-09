'use strict';

var glob = require( 'glob' ),
    sprity = require( 'sprity' );

module.exports = function( gulp, $, args ) {
  var images = glob.sync( PATHS.file.src.sprites );

  // The sprity doesn't handle error when
  // the source files don't exist
  if ( !images.length ) {
    return;
  }

  function task() {
    return sprity.src( {
      dimension: [
        {
          dpi: 720,
          ratio: 1
        },
        {
          dpi: 1920,
          ratio: 2
        }
      ],
      name: 'sprites',
      src: PATHS.file.src.sprites,
      style: 'sprites.styl',
      prefix: 'icon-sprites',

      // Don't use global var CONFIG_DIR, it crashs :(
      template: './config/gulp/sprites-tpl.hbs'
    } )
    .pipe( $.if(
      '*.png',
      gulp.dest( PATHS.dir.public.images ),
      gulp.dest( PATHS.dir.assets.styles )
    ) )
    .on( 'error', $.util.log );
  }

  return {
    dependencies: [ 'clean:sprites' ],
    fn: task
  };
};
