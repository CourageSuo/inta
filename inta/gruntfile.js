module.exports = function(grunt){
	grunt.initConfig({
		htmlmin: {
			firstTarget:{
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					"views/index.html":"views/indexg.html",
					"views/piracy/book.html":"views/piracy/bookg.html"
				}
			}
		}
	})
	grunt.loadNpmTasks("grunt-contrib-htmlmin")
	grunt.registerTask("default",['htmlmin'])
}