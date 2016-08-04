'use strict';
var config = require('./config/config');
module.exports = function (grunt) {
    // Unified Watch Object
    var watchFiles = {
        serverViews: ['www/views/**/*.*'],
        serverJS: ['config/*.js', 'controller/*.js', 'routes/*.js', 'services/*.js'],
        clientViews: ['public/modules/**/views/**/*.html', 'www/views/*.html'],
        clientJS: ['app/scripts/**/*.js', '!app/scripts/routing/templates.js', '!app/scripts/settings.js'],
        clientCSS: ['www/styles/*.css'],
    };

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                reporter: require('jshint-stylish').toString(),
                jshintrc: true
            },
            all: {src: watchFiles.clientJS.concat(watchFiles.serverJS)}
        },

        mongobackup: {
            options: {
                host: config.mongo.host,
                port: config.mongo.port,
                db: config.mongo.db,
                dump: {out: './dump'},
                restore: {path: './dump/networc', drop: true}
            }
        }
    });

    // Load NPM tasks
    require('load-grunt-tasks')(grunt);

    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    // A Task for loading the configuration object
    grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function () {
        var init = require('./config/init')();
        var config = require('./config/config');

        grunt.config.set('applicationJavaScriptFiles', config.assets.js);
        grunt.config.set('applicationCSSFiles', config.assets.css);
    });

};