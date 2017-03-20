module.exports = function(grunt){
	grunt.initConfig({
		htmlmin: {
			firstTarget:{
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					"views/index0.html":"views/index.html"
				}
			}
		}
	})
	grunt.loadNpmTasks("grunt-contrib-htmlmin")
	grunt.registerTask("default",['htmlmin'])
}