module.exports = function (grunt) {

  grunt.initConfig({

    watch: {
      files: "src/**/*.js",
      tasks: "default"
    },

    lint: {
      files: "src/**/*.js"
    },

    browserify: {
      "public/js/main.js": {
        entries: ["src/main.js"],
        aliases: [
          "jquery:jquery-browserify"
        ],
        requires: ["jquery-browserify"]
      }
    }

  });

  grunt.loadNpmTasks("grunt-browserify");

  grunt.registerTask("default", "lint browserify");

};
