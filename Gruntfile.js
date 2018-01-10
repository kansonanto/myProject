'use strict';
module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Show grunt task time
    require('time-grunt')(grunt);

    // Configurable paths for the app
    var appConfig = {
        app: 'app',
        dist: 'dist'
    };
    // Grunt configuration
    grunt.initConfig({

        // Project settings
        inspinia: appConfig,
        wiredep: {
            task: {
                ignorePath: '../',
                src: ['.tmp/index.html']
            }
        },
        // The grunt server settings
        connect: {
            options: {
                port: 8000,
                hostname: 'localhost',
                livereload: 35728
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= inspinia.dist %>'
                }
            }
        },
        // Compile less to css
        less: {
            development: {
                options: {
                    compress: true,
                    optimization: 2
                },
                files: {
                    "app/styles/style.css": "app/less/style.less"
                }
            }
        },
        // Watch for changes in live edit
        watch: {
            styles: {
                files: ['app/less/**/*.less'],
                tasks: ['less', 'copy:styles'],
                options: {
                    nospawn: true,
                    livereload: '<%= connect.options.livereload %>'
                },
            },
            js: {
                files: ['<%= inspinia.app %>/scripts/{,*/}*.js','app/modules/{,*/}*/controllers/{,*/}*.js'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= inspinia.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= inspinia.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        // If you want to turn on uglify you will need write your angular code with string-injection based syntax
        // For example this is normal syntax: function exampleCtrl ($scope, $rootScope, $location, $http){}
        // And string-injection based syntax is: ['$scope', '$rootScope', '$location', '$http', function exampleCtrl ($scope, $rootScope, $location, $http){}]
        uglify: {
            options: {
                mangle: false,
                maxLineLen:0,
                compress: {
                    drop_console: true
                }
            }
        },
        compress: {
          main: {
            options: {
              mode: 'gzip'
            },
            files: [
              // Each of the files in the src/ folder will be output to
              // the dist/ folder each with the extension .gz.js
              {expand: true,   src: ['dist/scripts/*.js'], dest: '.tmp/scripts/'},
              {expand: true,   src: ['dist/styles/*.css'], dest: '.tmp/styles/'}
            ]
          }
        },
        // Clean dist folder
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= inspinia.dist %>'
                    ]
                }]
            },
            tmpCompressed:{
                files: [{
                    dot: true,
                    src: ['styles','scripts']
                }]
            },
            server: ['.tmp', '<%= inspinia.app %>/styles/style.css']
        },
        // convert all html files to angularjs templateCache.js
        ngtemplates:  {
            app:        {
                cwd: 'app',
                src:     ['modules/{,*/}*/{,*/}*.html'],
                dest:     'app/scripts/template.js',
                options:    {
                    module: 'successApp',
                    htmlmin: {
                        /*collapseBooleanAttributes:      true,
                        collapseWhitespace:             true,
                        removeAttributeQuotes:          true,
                        removeComments:                 true, // Only if you don't use comment directives!
                        removeEmptyAttributes:          true,
                        removeScriptTypeAttributes:     true,
                        removeStyleLinkTypeAttributes:  true*/
                    }
                }
            }
        },
        //  Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= inspinia.app %>',
                    dest: '<%= inspinia.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'modules/gettingStarted/{,*/}*.*',
                        'styles/patterns/*.*',
                        'img/{,*/}*.*',
                        'fonts/{,*/}*.*',
                        'sw.js',
                        'manifest.json',
                        'modules/core/translation/{,*/}*.json',
                        'modules/dynamicForm/controllers/*.json',
                        'data/pageInstructionData.json',
                        'img/demo-img/img/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/fontawesome',
                    src: ['fonts/*.*'],
                    dest: '<%= inspinia.dist %>'
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/bootstrap',
                    src: ['fonts/*.*'],
                    dest: '<%= inspinia.dist %>'
                } ]
            },
            styles: {
                expand: true,
                cwd: '<%= inspinia.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            wiredep: {
                expand: true,
                cwd: '<%= inspinia.app %>',
                dest: '.tmp',
                src: 'index.html'
            },
          compressed: {
                files: [{
                    expand: true,
                    cwd:'.tmp/styles/dist/',
                    src: 'styles/*.*',
                    dest: '<%= inspinia.dist %>/'
                }, {
                    expand: true,
                    dot: true,
                    cwd:'.tmp/scripts/dist/',
                    src: 'scripts/*.*',
                    dest: '<%= inspinia.dist %>'
                } ]
            }
        },
        
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= inspinia.dist %>/scripts/{,*/}*.js',
                    '<%= inspinia.dist %>/styles/{,*/}*.css',
                    '<%= inspinia.dist %>/styles/fonts/*'
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= inspinia.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= inspinia.dist %>'
                }]
            }
        },
        useminPrepare: {
            html: '.tmp/index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: ['dist/index.html']
        }
    });

    // Run live version of app
    grunt.registerTask('live', [
        'clean:server',
        'localbuild',
        'connect:dist:keepalive'
    ]);

    // Run build version of app
    grunt.registerTask('server', [
        'clean:server',
        'less',
        'copy:wiredep',
        'wiredep',
        'copy:styles',
        'connect:livereload',
        'watch'
    ]);

    // Build version for production
    grunt.registerTask('build', [
        'clean:dist',
        'less',
        'copy:wiredep',
        'wiredep',
        'useminPrepare',
        'concat',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin',
        'compress',
        'copy:compressed',
        'clean:server'
    ]); 

// Build version for local
    grunt.registerTask('localbuild', [
        'clean:dist',
        'less',
        'copy:wiredep',
        'wiredep',
        'useminPrepare',
        'concat',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin',
        'clean:server'
    ]); 
    grunt.registerTask('template', [
        'ngtemplates'
    ]);
};