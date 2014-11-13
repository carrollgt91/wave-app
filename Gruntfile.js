module.exports = function(grunt) {
  var envToUse = grunt.option("env") || "prod";
  var env = {};
  if(envToUse == "prod"){
    env = {
      apiUrl: 'http://malachite-api.herokuapp.com/api',
      clientId: '251c9152fb3757d609504877ed494ae0',
      redirectUri: 'http://waveplayer.co/callback.html'
    };
  }
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
           'build-tmp/config.js':'app/config.js'
        },
        options: {
          replacements: [
            {
              pattern: "rootUrl: 'http://malachite-api.herokuapp.com/api'" ,
              replacement: 'rootUrl: "' + env.apiUrl + '"'
            },
            {
              pattern: "clientId: '58bb956d274f4b5af9637dbbfe47297f'",
              replacement: 'clientId: "' + env.clientId + '"'
            },
            {
              pattern: "redirectUri: 'http://localhost:8080/callback.html'",
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
  
  grunt.registerTask('deploy', ["copy:pre-build", "string-replace:release", 'aws_s3']);
};