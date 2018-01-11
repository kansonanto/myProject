module.exports = function(grunt) {
    
    var serveStatic = require('serve-static');

    // Configurable paths for the app
    var appConfig = {
        app: 'src',
        dist: 'dist'
    };

      grunt.initConfig({
        inspinia: appConfig,
        jshint: {
          files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
          options: {
            globals: {
              jQuery: true
            }
          }
        },
        // The grunt server settings
        connect: {
            options: {
                port: 8005,
                hostname: 'localhost',              
                base: 'src'   
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function(connect) {
                        return [                          
                            serveStatic('src')
                        ];
                    }
                }
            }
        },
        watch: {
          files: ['<%= jshint.files %>'],
          tasks: ['jshint'],
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
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
              // define a string to put between each file in the concatenated output
              separator: ';'
            },
            dist: {
              // the files to concatenate
              src: ['src/**/*.js'],
              // the location of the resulting JS file
              dest: 'dist/<%= pkg.name %>.js'
            }
          },
          uglify: {
            options: {
              // the banner is inserted at the top of the output
              banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
              files: {
                'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
              }
            }
          }
          
      });

      
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-contrib-connect');
      
      
     // Run build version of app
     grunt.registerTask('server', [
        'jshint','concat', 'uglify',
        'connect:livereload',
        'watch'
    ]);

      grunt.registerTask('default', ['jshint','concat', 'uglify']);
    
    };