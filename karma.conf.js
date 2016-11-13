module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            './node_modules/angular/angular.js',
            './node_modules/angular-ui-router/release/angular-ui-router.js',
            './node_modules/angular-mocks/angular-mocks.js',
            './node_modules/jquery/dist/jquery.min.js',
            './public/components/todo/*',
            './public/components/core.js',
            './public/components/**/*.spec.js'
        ],
        exclude: [
        ],
        preprocessors: {
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity
    })
}