module.exports = function(grunt) {
  grunt.initConfig({
    buildEnv: grunt.option('env'),
    ngtemplates: {
      dist: {
	src: ['ui/**/*.html', '<%= buildEnv %>/**/*.html'],
	dest: '<%= buildEnv %>/ui/assets/extensions/templates.js',
	options: {
	  url: function(file) {
	    var buildEnv = grunt.option('env')
	    file = file.replace(buildEnv+'/', '');
	    file = file.replace('assets/extensions', 'custom-templates');
	    return file
          },
	  prefix: 'online/',
          module: 'openshiftOnlineConsoleTemplates',
          standalone: true
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.registerTask('build', ['ngtemplates']);
}
