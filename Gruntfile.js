module.exports = function(grunt) {
  var dontMangle = Object.keys(grunt.file.readJSON('./.jshintrc').globals)
    , appIdx = dontMangle.indexOf('app');

  if (appIdx !== -1) {
    dontMangle.splice(appIdx, 1);
  }

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');

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
        js: './public/javascripts'
      , jsApp: './public/javascripts/app'
      , test: './test'
      , styles: './public/stylesheets'
    }

    , concat: {
      app: {
        files: {
          "<%= paths.js %>/app.js": [
              "<%= paths.jsApp %>/modules/app.js"
            , "<%= paths.jsApp %>/services/Stor.js"
            , "<%= paths.jsApp %>/controllers/MainAppCtrl.js"
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

      , less: {
          files: [ "<%= paths.styles %>/**/*.less" ]
        , tasks: [ "less:development" ]
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
        options: { jshintrc: "./.jshintrc" }
      , src: [ "<%= paths.jsApp %>/**/*.js" ]
    }

    , karma: {
      unit: {
          configFile: '<%= paths.test %>/karma.conf.js'
        , runnerPort: 9999
        , autoWatch: false
        , browsers: ['Chrome']
      }
    }

    , less: {
      development: {
        options: {
            compress        : false
          , yuicompress     : false
          , dumpLineNumbers : 'comments'
        }
        , files: { '<%= paths.styles %>/styles.css': '<%= paths.styles %>/styles.less' }
      }
      , production: {
        options: {
            compress        : false
          , yuicompress     : true
          , dumpLineNumbers : false
        }
        , files: { '<%= paths.styles %>/styles.css': '<%= paths.styles %>/styles.less' }
      }
    }
  });

  grunt.registerTask('default', [
      "concat:app"
    , "jshint"
    , "uglify"
    , "concat:build"
    , "less:production"
    , "karma:unit:run"
  ]);
};