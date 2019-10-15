<?php
/**
 * Plugin Name: Gutenberg Mix
 * Plugin URI:  https://github.com/Mamaduka/gutenberg-mix
 * Description: A template for building Gutenberg blocks and plugins using Laravel Mix.
 * Author:      George Mamadashvili
 * Author URI:  https://mamaduka.com
 * Version:     1.0.0
 */

namespace Mamaduka\GutenbergMix;

/**
 * Get the script manifest.
 *
 * @param string $path     File path.
 * @param string $dir      Directory.
 * @return array $manifest
 */
function manifest( $path, $dir ) {
	$pathinfo      = pathinfo( trailingslashit( $dir ) . $path );
	$manifest_path = "{$pathinfo['dirname']}/{$pathinfo['filename']}.asset.php";

	if ( ! file_exists( $manifest_path ) ) {
		return [ 'dependencies' => [], 'version' => false ];
	}

	$manifest = require $manifest_path;

	return $manifest;
}

/**
 * Enqueue block editor assets.
 *
 * @return void
 */
function block_editor_assets() {
	$script_path = 'build/js/editor.js';
	$manifest    = manifest( $script_path, __DIR__ );

	wp_enqueue_script(
		'gutenberg-mix-script',
		plugins_url( $script_path, __FILE__ ),
		$manifest['dependencies'],
		$manifest['version']
	);

	wp_enqueue_style(
		'gutenberg-mix-style',
		plugins_url( 'build/css/editor.css', __FILE__ )
	);
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\block_editor_assets' );
