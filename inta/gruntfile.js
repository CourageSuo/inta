module.exports = function(grunt){
	grunt.initConfig({
		htmlmin: {
			firstTarget:{
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					"views/index.html":"views/indexg.html"
				}
			}
		}
	})
	grunt.loadNpmTasks("grunt-contrib-htmlmin")
	grunt.registerTask("default",['htmlmin'])
}