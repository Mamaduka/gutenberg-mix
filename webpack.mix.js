// Import required packages.
const mix = require( 'laravel-mix' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

/*
 * Sets the development path to `dist`.
 */
const devPath = 'dist';

/**
 * Disable OS notifications.
 */
mix.disableNotifications();

/*
 * Sets the path to the generated assets.
 */
mix.setPublicPath( 'build' );

/*
 * Builds sources maps for assets.
 *
 * @link https://laravel.com/docs/5.8/mix#css-source-maps
 */
mix.sourceMaps();

/*
 * Compile JavaScript.
 *
 * @link https://laravel.com/docs/5.8/mix#working-with-scripts
 */
mix.react( `${devPath}/js/editor.js`, 'js' )

/*
 * Compile CSS. Mix supports Sass, Less, Stylus, and plain CSS, and has functions
 * for each of them.
 *
 * @link https://laravel.com/docs/5.8/mix#working-with-stylesheets
 * @link https://laravel.com/docs/5.8/mix#sass
 * @link https://github.com/sass/node-sass#options
 */

// Compile SASS/CSS.
mix.sass( `${devPath}/scss/editor.scss`, 'css' )

/*
 * Add custom Webpack configuration.
 *
 * @link https://laravel.com/docs/5.8/mix#custom-webpack-configuration
 * @link https://webpack.js.org/configuration/
 * @link https://www.npmjs.com/package/@wordpress/dependency-extraction-webpack-plugin
 */
mix.webpackConfig( {
	stats        : 'minimal',
	devtool      : mix.inProduction() ? false : 'source-map',
	performance  : { hints  : false },
	watchOptions : { ignored: /node_modeuls/, },
	plugins      : [
		new DependencyExtractionWebpackPlugin(),
	]
} );
