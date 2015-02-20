module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
	pkg: grunt.file.readJSON("package.json"),
	clean: {
		"css": "public/css/app"
	},
	concat: {
		prodCssCommon:{
			src: [
				"public/css/vendor/bootstrap.min.css",
				"public/css/vendor/font-awesome.min.css",
				"public/css/vendor/select2.css"
			],
			dest: "public/css/c.css"
		},
		prodCssSpa: {
			src: [
				"public/css/vendor/datepicker.min.css",
				"public/css/vendor/bootstrap-timepicker.min.css",
				"public/css/vendor/jquery.dataTables.min.css",
				"public/css/vendor/jquery.nouislider.min.css"
			],
			dest: "public/css/s.css"
		}
	},
	jst: {
		spa: {
			options:{
				prettify: true,
				processName: function(longPath){
					return longPath.substr(9);
				}
			},
			files:{
				"public/js/tmpl/templates.js": [
					"src/tmpl/**/*.html"
				]
			}
		}
	},
	less: {
		spa: {
			files:{
				"public/css/app/spa.css": "src/style/main.less"
			}
		}
	},
	cssmin: {
		spa: {
			files: {
				"public/css/app/spa.min.css": ["public/css/app/spa.css"]
			}
		}
	},
	watch: {
	  css: {
	    files: '**/*.less',
	    tasks: ['grunt'],
	    options: {
	      livereload: true,
	    },
	  }
	}

  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-jst");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task(s).
  grunt.registerTask(
	"default",
	[
		"clean:css",
		"jst:spa",
		"less:spa",
		"cssmin:spa",
		"concat:prodCssCommon",
		"concat:prodCssSpa"
	]);




};
