/**
 * The following task is based on the guljs team's recipes
 * https://github.com/sogko/gulp-recipes/blob/master/browserify-vanilla/README.md
 * https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
 * https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
 *
 * Browserfying things up!
 *                     ____
 *                   .'* *.'
 *                __/_*_*(_
 *               / _______ \
 *              _\_)/___\(_/_
 *             / _((\- -/))_ \
 *             \ \())(-)(()/ /
 *              ' \(((()))/ '
 *             / ' \)).))/ ' \
 *            / _ \ - | - /_  \
 *           (   ( .;''';. .'  )
 *           _\"__ /    )\ __"/_
 *             \/  \   ' /  \/
 *              .'  '...' ' )
 *               / /  |  \ \
 *              / .   .   . \
 *             /   .     .   \
 *            /   /   |   \   \
 *          .'   /    b    '.  '.
 *      _.-'    /     Bb     '-. '-._
 *  _.-'       |      BBb       '-.  '-.
 * (________mrf\____.dBBBb.________)____)
 */

'use strict';

var browserify = require( 'browserify' ),
    babelify = require('babelify'),
    source = require( 'vinyl-source-stream' ),
    buffer = require( 'vinyl-buffer' ),
    mergeStream = require( 'merge-stream' ),
    glob = require( 'glob' );

module.exports = function( gulp, $, args ) {
  function task() {
    var streams = [],
        files = glob.sync( PATHS.dir.assets.scripts + 'pages/*.js' );

    files.push( PATHS.dir.assets.scripts + 'main.js' );

    // Loop through all the scripts which need to be browserfied
    files.forEach( function( file ) {
      var bundler = browserify( {
            entries: file,
            basedir: PATHS.dir.assets.scripts,
            debug: true,
            extensions: [ '.js' ]
          } ),
          name = file.replace( /.*\//g, '' );

      bundler.transform( 'babelify', {
        presets: [ 'es2015' ],
        sourceMaps: false,
      } );

      streams.push( compile( bundler, name ) );
    } );

    // Merge all bundles and return the stream
    return ( mergeStream( streams ) );
  }

  /**
   * Compile a bundler
   *
   * @param {Object} bundler
   * @param {String} name
   * @return {Object}
   */
  function compile( bundler, name ) {
    return bundler
      .bundle()
      .on( 'error', $.util.log )
      .on( 'error', function( err ) {
        this.emit( 'end' );
      } )
      .pipe( source( name ) )
      .pipe( buffer() )

      // Development
      .pipe( $.if(
        ENV === 'dev',
          $.plumber()
      ) )
      .pipe( $.sourcemaps.init( { loadMaps: true } ) )
      .pipe( $.if(
        ENV === 'dev',
        $.sourcemaps.write( './map/' )
      ) )

      // Production
      .pipe( $.if(
        ENV === 'prod',
        $.uglify( {
          mangle: false
        } )
      ) )

      // Dist
      .pipe( gulp.dest( PATHS.dir.public.scripts ) );
  }

  return {
    dependencies: [ 'clean:scripts' ],
    fn: task
  };
};
