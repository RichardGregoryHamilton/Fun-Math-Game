module.exports = function(grunt) {

  grunt.initConfig({
	
	uncss: {
		dist: {
			options: {
				ignore: ['.unlocked', '.locked', '.gold', '.silver', '.bronze']
			},
			files: {
				'assets/stylesheets/tidy.css': ['*.html', 'views/partials/*.html', 'views/*.html']
			}
		}
	},
	
    cssmin: {
        css: {
			files: {
				'assets/stylesheets/styles.min.css': ['assets/stylesheets/tidy.css']
			}
		}
    },
	
	uglify: {
		my_target: {
			files: {
				'scripts/main.min.js': ['scripts/*.js', 'scripts/services/*.js', 'scripts/controllers/*.js']
			}
		}
	}
	
  });

	grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['uncss', 'cssmin', 'uglify']);
};