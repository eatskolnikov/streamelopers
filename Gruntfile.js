module.exports = function(grunt) {
    var pad = function (number, length) {
      var str = '' + number;
      while (str.length < length) {
          str = '0' + str;
      }
      return str;
    };
    Date.prototype.YYYYMMDDHHMMSS = function () {
       var yyyy = this.getFullYear().toString();
       var MM = pad(this.getMonth() + 1,2);
       var dd = pad(this.getDate(), 2);
       var hh = pad(this.getHours(), 2);
       var mm = pad(this.getMinutes(), 2);
       var ss = pad(this.getSeconds(), 2);
       return yyyy + MM + dd+  hh + mm + ss;
    };
    var date = new Date().YYYYMMDDHHMMSS();
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['Gruntfile.js', 'src/app/**/*.js', 'src/sw.js']
        },
        watch: {
            build: {
                files: ['src/**/*.js','src/**/*.css', 'src/**/*.html', 'src/**/*.json'],
                tasks: ['jshint', 'clean:build', 'ngtemplates', 'concat', 'uglify', 'cssmin', 'htmlmin', 'copy', 'imagemin', 'string-replace'],
                options: {
                    spawn: false
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    report: 'gzip',
                    cwd: 'build/assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/assets/css',
                    ext: '.min.css'
                }]
            }
        },
        concat: {
            options: {
                separator: '\n'
            },
            css: {
                src: ['bower_components/uikit/css/uikit.min.css',
                      'bower_components/uikit/css/uikit.almost-flat.min.css',
                      'src/assets/css/style.css'],
                dest: 'build/assets/css/main.css'
            },
            app:{
                src:['bower_components/jquery-2.1.4.min/index.js',
                     'bower_components/uikit/js/uikit.min.js',
                     'bower_components/papaparse/papaparse.min.js',
                     'bower_components/angular/angular.min.js',
                     'bower_components/angular-route/angular-route.min.js',
                     'bower_components/recordrtc/RecordRTC.min.js',
                     'src/assets/js/shared.js',
                     'src/app/app.js',
                     'build/templates.js',
                     'src/app/routes.js',
                     'src/app/controllers/*'],
                dest:'build/app.js'
            }
        },
        ngtemplates:  {
          StreamelopersApp:{
            src:  'src/app/views/**/*.html',
            dest: 'build/templates.js',
            options: {
               htmlmin:  { collapseWhitespace: true, removeComments: true }
            }
          }
        },
        uglify: {
            app:{
                src: 'build/app.js',
                dest: 'build/app.min.js'
            }
        },
        htmlmin: {
            main: {
                options: {
                    removeIgnored: true,
                    removeEmptyAttributes: false,
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': 'src/index.html'
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ['src/.htaccess'], dest: 'build/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['bower_components/uikit/fonts/*'], dest: 'build/assets/fonts', filter:'isFile'},
                    {expand: true, flatten: true, src: ['src/manifest.json'], dest: 'build/', filter:'isFile'},
                    {expand: true, flatten: true, src: ['src/browserconfig.xml'], dest: 'build/', filter:'isFile'},
                    {expand: true, flatten: true, src: ['src/streamelopers_donations.csv'], dest: 'build/', filter:'isFile'},
                    {expand: true, flatten: true, src: ['src/google17e988616126521e.html'], dest: 'build/', filter:'isFile'},
                    {expand: true, flatten: true, src: ['src/sw.js'], dest: 'build/', filter:'isFile'}
                ]
            }
        },
        clean:{
            build: {
                src:['build/']
            }
        },
        imagemin: {
            options: {
                optimizationLevel: 5
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.{png,jpg,gif,ico}'],
                    dest: 'build'
                }]
            }
        },
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                duration: 3
            }
        },
        remove: {
            clean: {
                trace: true,
                fileList: ['build/app.js', 'build/assets/css/main.css', 'build/templates.js']
            }
        },
        'string-replace':{
          dist:{
            files:[{
              expand:true,
              cwd:'build/',
              src: ['**/*.js','**/*.html'],
              dest:'build/'
            }],
            options: {
              replacements: [{
                pattern: /STREAMELOPERS_CURRENT_VERSION/ig,
                replacement: date
              },{
                pattern: /STREAMELOPERS_CURRENT_VERSION/ig,
                replacement: date
              }]
            }
          }
        }
    });
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-remove');
    grunt.registerTask('build', function () {
        grunt.task.run(['jshint', 'clean:build', 'ngtemplates', 'concat', 'uglify', 'cssmin', 'htmlmin', 'copy', 'imagemin', 'remove', 'string-replace']);
    });
    grunt.registerTask('default', ['watch']);
};
