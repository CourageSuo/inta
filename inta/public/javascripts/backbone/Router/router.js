var sb = null

var cgFunction = function(aa){
	    $('.pagination li').remove()
        $('.mainUl li').remove()
       	allContent.reset()
		_.each(listModel,function(item,i){
			if(item.tag === aa){
				allContent.add(item)
			}
		})

		if(allContent.length > 10){
            for (var i = 0; i < 10; i++) {
            	$('.mainUl').append((new itemView({model: allContent.at(i)})).render().$el)
            }
		} else {
			new itemsView;
		}

		allContentCache = allContent.toArray()
		a.createPagination()
}

var myRouter = Backbone.Router.extend({
	routes:{
		"": "mainPage",//一定要注意router 操作的是hash，所以空就表示空hash
		"blog/:modelId": "ownerPage",
		"article":"article",
		"q&a":"answer",
		"trade-off":"tradeoff",
		"thingforyou":"thingforyou",
		"ong":"ong"
	},
	mainPage: function(){
		bl.show()
		if(sb !== null){
			sb.hide()
		}
		
	},
	ownerPage: function(modelId){
		_.each(listModel,function(item,i){
			if(item._id === modelId){
				$.get('/helloworld/addRead/' + modelId)
				sb = new selfBlog({model:item})
				sb.show()
				document.body.scrollTop = document.documentElement.scrollTop = 0;
			}
		})
		bl.hide()
		// sb.show()
	},
	article: function(){
		cgFunction('文章')
	},
	answer: function(){
		cgFunction('问题')
	},
	tradeoff: function(){
		cgFunction('学习资料')
	},
	thingforyou: function(){
		cgFunction('培训这些事儿')
	},
	ong: function(){
		cgFunction('何事囧')
	}
})

var router = new myRouter

Backbone.history.start()