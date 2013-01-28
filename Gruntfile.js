module.exports = function (grunt) {

  grunt.initConfig({

    watch: {
      files: "src/**/*.js",
      tasks: "default"
    },

    jshint: {
      files: "src/**/*.js"
    },

    browserify: {
      "public/js/main.js": {
        src: ["src/main.js"],
        aliases: [
          "jquery:jquery-browserify"
        ],
        requires: ["jquery-browserify"]
      }
    }

  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["jshint", "browserify"]);

};
