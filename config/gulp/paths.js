var

// Src
ASSETS = APP_DIR + 'assets/',
ASSETS_IMAGES = ASSETS + 'images/',
ASSETS_SCRIPTS = ASSETS + 'scripts/',
ASSETS_STYLES = ASSETS + 'styles/',
ASSETS_SPRITES = ASSETS_IMAGES + 'sprites/',
ASSETS_SVGS = ASSETS_IMAGES + 'svgs/',
DATA = APP_DIR + 'data/',
TEMPLATES = APP_DIR + 'templates/',

// Public
PUBLIC = ROOT_DIR + 'public/',
PUBLIC_IMAGES = PUBLIC + 'images/',
PUBLIC_SCRIPTS = PUBLIC + 'js/',
PUBLIC_STYLES = PUBLIC + 'css/';

module.exports = {
  dir: {
    assets: {
      base: ASSETS,
      images: ASSETS_IMAGES,
      scripts: ASSETS_SCRIPTS,
      styles: ASSETS_STYLES,
      svgs: ASSETS_SVGS,
      sprites: ASSETS_SPRITES
    },
    data: DATA,
    'public': {
      base: PUBLIC,
      images: PUBLIC_IMAGES,
      scripts: PUBLIC_SCRIPTS,
      styles: PUBLIC_STYLES
    },
    templates: TEMPLATES
  },
  file: {
    src: {
      data: DATA + '**/*.json',
      images: [
        ASSETS_IMAGES + '**/*.{jpg,png}',
        ASSETS_IMAGES + '*.svg'
      ],
      scripts: ASSETS_SCRIPTS + '**/*.js',
      styles: ASSETS_STYLES + '**/*.styl',
      svgs: ASSETS_SVGS + '*.svg',
      sprites: ASSETS_SPRITES + '*.{jpg,png}',
      templates: TEMPLATES + '**/*.pug'
    },
    'public': {
      images: PUBLIC_IMAGES + '**/*.{jpg,png,svg}',
      scripts: PUBLIC_SCRIPTS + '*.js',
      styles: PUBLIC_STYLES + '*.css',
      svgs: PUBLIC_IMAGES + 'inline-svg.svg',
      sprites: PUBLIC_IMAGES + 'sprites*.png',
      templates: PUBLIC + '*.html'
    }
  }
};
