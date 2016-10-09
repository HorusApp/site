'use strict';

var _ = require( 'lodash' ),
    fs = require( 'fs' ),
    glob = require( 'glob' );

module.exports = function( gulp, $, args ) {
  function task() {
    return gulp.src( PATHS.dir.templates + 'pages/*.pug' )
      .pipe( $.if(
        ENV === 'dev',
        $.plumber()
      ) )

      // Data
      .pipe( $.data( function( file ) {
        var data = {},
            revFile = PATHS.dir.public.base + 'rev-manifest.json',
            defaultData = glob.sync( PATHS.dir.data + '*/*.json' ),
            file = file.path
                  .replace( 'templates/pages/', 'data/' )
                  .replace( '.pug', '.json' );

        // Add revision file if it exists
        if ( ENV === 'prod' ) {
          defaultData.push( revFile );
        }

        // Default data
        defaultData.forEach( function( json ) {

          // Get only the name of the file
          // path/to/file/xxx.json --> xxx
          var jsonName = json.match( /.*\/(.*)\..*/ )[ 1 ];
          data[ jsonName ] = JSON.parse( fs.readFileSync( json ) );
        } );

        // Merge all datas
        data = _.assign(
                {},
                data,
                JSON.parse( fs.readFileSync( file ) ),
                { env: ENV }
              );

        return data;
      } ) )

      // Templates
      .pipe( $.pug( {
        pretty: true
      } ) )
      .on( 'error', $.util.log )

      // Production
      .pipe( $.if(
        ENV === 'prod',
        $.minifyHtml()
      ) )

      // Dist
      .pipe( gulp.dest( PATHS.dir.public.base ) );
  }

  return {
    dependencies: [ 'clean:templates' ],
    fn: task
  };
};
