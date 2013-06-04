module.exports = function(grunt) {
  var dontMangle = Object.keys(grunt.file.readJSON('./.jshintrc').globals)
    , appIdx = dontMangle.indexOf('app');

  if (appIdx !== -1) {
    dontMangle.splice(appIdx, 1);
  }

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')

    , meta: {
      banner: [
            "/** <%= pkg.name %> - v<%= pkg.version %> - <%= pkg.homepage %>"
          , "  * Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author %>. All rights reserved."
          , "  * Licensed <%= _.pluck(pkg.licenses, 'type')[0] %> - <%= _.pluck(pkg.licenses, 'url')[0] %>"
          , "  */"
          , ""
          , "(function(){"
        ].join('\n')

      , footer: "}());"
    }

    , paths: {
        js: './public/javascripts/app'
      , test: './test'
      , styles: './public/stylesheets'
    }

    , concat: {
      app: {
        files: {
          "<%= paths.js %>/app.js": [
              "<%= paths.js %>/modules/app.js"
            , "<%= paths.js %>/services/Stor.js"
            , "<%= paths.js %>/controllers/MainAppCtrl.js"
          ]
        }
      }

      , build: {
        options: { banner: "<%= meta.banner %>", footer: "<%= meta.footer %>" }
        , files: {
            "<%= paths.js %>/app.js": [ "<%= paths.js %>/app.js" ]
          , "<%= paths.js %>/app.min.js": [ "<%= paths.js %>/app.min.js" ]
        }
      }
    }

    , watch: {
      js: {
          files: [ "<%= paths.js %>/**/*.js" ]
        , tasks: [ "concat:app", "jshint", "uglify", "karma:unit:run" ]
      }

      , test: {
          files: [ "<%= paths.test %>/**/*.spec.js" ]
        , tasks: [ "karma:unit:run" ]
      }
    }

    , uglify: {
      app: {
        options: {
          // Default compress options. Listed for reference.
          compress: {
            loops           : true
            , unused        : true
            , unsafe        : true
            , cascade       : true
            , warnings      : true
            , booleans      : true
            , evaluate      : true
            , dead_code     : true
            , join_vars     : true
            , if_return     : true
            , sequences     : true
            , hoist_vars    : false
            , hoist_funs    : true
            , properties    : true
            , comparisons   : true
            , conditionals  : true
            , drop_debugger : true
          }
          , report: 'gzip'
          , mangle: { except: dontMangle }
        }
        , files: { "<%= paths.js %>/app.min.js": [ "<%= paths.js %>/app.js" ] }
      }
    }

    , jshint: {
        options: { jshintrc: "./.jshintrc", ignores: [ "<%= paths.js %>/app.min.js" ] }
      , src: [ "<%= paths.js %>/**/*.js" ]
    }

    , karma: {
      unit: {
          configFile: '<%= paths.test %>/karma.conf.js'
        , runnerPort: 9999
        , autoWatch: false
        , browsers: ['Chrome']
      }
    }
  });

  grunt.registerTask('default', [
      "concat:app"
    , "jshint"
    , "uglify"
    , "concat:build"
    , "karma:unit:run"
  ]);
};