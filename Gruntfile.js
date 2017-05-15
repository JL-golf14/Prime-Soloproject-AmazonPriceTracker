module.exports = function(grunt) {

grunt.initConfig({
  sass: {
    options:{
      outputStyle: "expanded",
      sourceMap: true
    },
    dist:{
    files:[{
    expand: true,
    cwd: 'public/css/',
    src:"**/*.scss",
    dest: "public/css/",
    ext: ".css"
    }]
    }

  },
  watch:{
    files: "public/css/sass/*.scss",
    tasks: "sass"
  }

});
grunt.loadNpmTasks('grunt-sass');
grunt.loadNpmTasks("grunt-contrib-watch");
}
