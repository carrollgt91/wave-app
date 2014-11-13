module.exports = function(grunt) {

  var envToUse = grunt.option('env') || 'dev';
  var env = require('./environments/' + envToUse + '.js');
  console.log("env to use: " + envToUse);
  console.log(env);
  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('creds.json'),

    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>', // Use the variables
        secretAccessKey: '<%= aws.AWSSecretKey %>', // You can also use env variables
        region: 'us-east-1',
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
      },
      production: {
        options: {
          bucket: 'www.waveplayer.co'
        },
        files: [
          { expand: true, cwd: 'build-tmp/app/', src: ['**'], action: 'upload', dest: '.', differential: true }
        ]
      } 
    },

    copy: {
      "pre-build": {
        files: [
          { expand: true, cwd: "app/", src:["**"], dest: "build-tmp/" }
        ]
      },
    },
    'string-replace': {
      release: {
        files: {
          'app/config.js': 'build-tmp/app/config.js'
        },
        options: {
          replacements: [
            {
              pattern: /rootUrl:\s*'\/\w+'/,
              replacement: 'rootUrl: "' + env.apiUrl + '"'
            },
            {
              pattern: /clientId:\s*'\/\w+'/,
              replacement: 'clientId: "' + env.clientId + '"'
            },
            {
              pattern: /redirectUri:\s*'\/\w+'/,
              replacement: 'redirectUri: "' + env.redirectUri + '"'
            }
          ]
        }
      }
    }    
  });

  
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask("test-copy", ["copy:pre-build"]);
  grunt.registerTask('deploy', ['aws_s3']);
};