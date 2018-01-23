module.exports = function(grunt) {
  grunt.initConfig({
    buildEnv: grunt.option('env'),
    ngtemplates: {
      dist: {
	src: [(function() {
	  var buildEnv = grunt.option('env')
	  var src = ['ui/**/*.html', buildEnv+'/**/*.html']
	  if(buildEnv == 'paid') {
	    src.push('notifications/**/*.html')
	  }
	  return src
	}())],
	dest: '<%= buildEnv %>/ui/assets/extensions/templates.js',
	options: {
	  url: function(file) {
	    var buildEnv = grunt.option('env')
	    file = file.replace(buildEnv+'/', '');
	    file = file.replace('notifications/', '');
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
