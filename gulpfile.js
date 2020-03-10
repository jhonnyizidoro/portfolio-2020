const {src, dest, series, task, watch, parallel} = require('gulp'),
	browserSync = require('browser-sync').create(),
	gulpClean = require('gulp-clean'),
	pump = require('pump'),
	gulpSass = require('gulp-sass'),
	gulpFavicons = require('gulp-favicons'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	vinylSourceStream = require('vinyl-source-stream'),
	vinylBuffer = require('vinyl-buffer'),
	gulpUglify = require('gulp-uglify'),
	gulpImagemin = require('gulp-imagemin'),
	imageminPngquant = require('imagemin-pngquant'),
	imageminZopfli = require('imagemin-zopfli'),
	imageminMozjpeg = require('imagemin-mozjpeg'),
	imageminGiflossy = require('imagemin-giflossy'),
	imageminJpegtran = require('imagemin-jpegtran'),
	imageminSvgo = require('imagemin-svgo'),
	gulpCache = require('gulp-cache'),
	gulpPug = require('gulp-pug'),
	gulpPlumber = require('gulp-plumber')


task(copy = () => {
	return pump([
		src('src/fonts/*'),
		dest('dist/fonts')
	])
})

task(clean = () => {
	return pump([
		src('dist'),
		gulpClean()
	])
})

task(sass = () => {
	return pump([
		src('src/sass/app.sass'),
		gulpSass({
			outputStyle: 'compressed'
		}).on('error', gulpSass.logError),
		dest('dist/css'),
		browserSync.stream()
	])
})

task(js = () => {
	return pump([
		browserify({
			entries: 'src/js/app.js'
		}).transform(babelify, {
			presets: ['@babel/env']
		}).bundle().on('error', error => console.log(error.stack)),
		vinylSourceStream('app.js'),
		vinylBuffer(),
		gulpUglify(),
		dest('dist/js')
	])
})

task(pug = () => {
	return pump([
		src('src/views/*.pug'),
		gulpPlumber(),
		gulpPug(),
		dest('dist')
	])
})

task(img = () => {
	return pump([
		src('src/images/**/*'),
		gulpCache(
			gulpImagemin([
				imageminPngquant({
					speed: 1,
					quality: [0.3, 0.5]
				}),
				imageminZopfli({
					more: true
				}),
				imageminGiflossy({
					optimizationLevel: 3,
					optimize: 3,
					lossy: 2
				}),
				imageminJpegtran({
					progressive: true
				}),
				imageminMozjpeg({
					quality: 90
				}),
				imageminSvgo({
					plugins: [
						{convertStyleToAttrs: false},
						{cleanupIDs: false},
						{removeTitle: true},
						{removeDesc: true},
					]
				})
			])
		),
		dest('dist/images')
	])
})

task(favicon = () => {
	return pump([
		src('src/favicon/favicon.png'),
		gulpFavicons({
			path: '/favicon',
			appName: 'Jhonny Izidoro Menarim | Portfólio',
			appShortName: 'Jhonny Izidoro Menarim | Portfólio',
			appDescription: 'Jhonny Izidoro Menarim | Portfólio',
			dir: 'auto',
			lang: 'pt-BR',
			background: '##373568',
			theme_color: '##373568',
			display: 'standalone',
			orientation: 'any',
			scope: '/',
			start_url: '/',
			logging: false,
			loadManifestWithCredentials: false,
			icons: {
				android: true,
				appleIcon: false,
				appleStartup: false,
				coast: false,
				favicons: true,
				firefox: false,
				windows: false,
				yandex: false,
			}
		}),
		dest('dist/favicon')
	])
})

task(reload = done => {
	browserSync.reload()
	done()
})

task(server = () => {
	browserSync.init({
		server: {
			baseDir: './dist',
		}
	})
	watch('src/sass/**/*', sass)
	watch('src/views/*', series(pug, reload))
	watch('src/js/**/*', series(js, reload))
	watch('src/images/**/*', series(img, reload))
	watch('src/favicon/favicon.png', series(favicon, reload))
	watch('src/views/**/*', series(pug, reload))
	watch('src/fonts/', series(copy, reload))
})

exports.watch = series(clean, parallel(sass, js, img, pug, copy, favicon), server)