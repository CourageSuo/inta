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
		},
		uglify: {
			minjs: {
				files:{
					"public/javascripts/index/mainindex.js":"public/javascripts/index/mainindexg.js",
					"public/javascripts/backbone/allbk.js":["public/javascripts/backbone/ModelView/headerNav.js",
                                                            "public/javascripts/backbone/Model/bmodel.js",
                                                            "public/javascripts/backbone/CollectionView/itemList.js",
                                                            "public/javascripts/backbone/View/bview.js",
                                                            "public//javascripts/backbone/Router/router.js"]
					                                        
				}
			}
		}

	})
	grunt.loadNpmTasks("grunt-contrib-htmlmin")
	grunt.loadNpmTasks("grunt-contrib-uglify")
	grunt.registerTask("default",['htmlmin','uglify'])
}