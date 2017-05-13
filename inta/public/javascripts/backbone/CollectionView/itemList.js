var listModel = listModel.reverse()
var pinNum = 10

var listContent = Backbone.Collection.extend({
	model:itemContent
})

var allContent = new listContent()

var allContentCache = listModel

for (var i = 0; i < pinNum; i++) {
	allContent.add(allContentCache[i])
}
	

var itemView = Backbone.View.extend({
	// model: new itemContent,
	tagName:"li",
	template: _.template($("#listContent").html()),
	render:function(){
		this.model.set('content',this.model.get('content').substring(0,68) + '...')
		this.$el.html(this.template(this.model.toJSON()))//就把模板变成了backbone中的View
		this.changeColor()
		return this
	},
	changeColor: function(){
		switch(this.model.get('tag')){
			case '文章':
				this.$('.tagStyleList').css('background-color','#00A388')
				break;
			case '问题':
				this.$('.tagStyleList').css('background-color','#e67e22')
				break;
			case '学习资料':
				this.$('.tagStyleList').css('background-color','#27ae60')
				break;
			case '培训这些事儿':
				this.$('.tagStyleList').css('background-color','#9b59b6')
				break;
			case '何事囧':
				this.$('.tagStyleList').css('background-color','#FF6138')
				break;
			default:
			    console.log(this.model.get('tag'))
		}
		
	}
})

var itemsView = Backbone.View.extend({
	model:allContent,//可以传入model
	el: ".mainUl",
	initialize: function(){
		this.render()
	},
	render: function(){
		var self = this 
		_.each(this.model.toArray(),function(item, i){ //把model.toArray是在视频中都出现错误的，bear in mind
			self.$el.append((new itemView({model: item})).render().$el)
		})
		return this 
	}

})
		
new itemsView;//当第一次进入页面的时候，需要显示，所以创建

var commentView = Backbone.View.extend({
	tagName:'li',
	template:_.template($("#commentTmp").html()),
	render: function(){
		this.model.save()
		console.log(this.model.toJSON())
		this.$el.html(this.template(this.model.toJSON()))
		return this
	}
})

var haveCommentView = Backbone.View.extend({
	tagName:'li',
	template:_.template($("#commentTmp").html()),
	render:function(){
		this.$el.html(this.template(this.model))
		return this
	}
})

var allContentCache = listModel


var paginationView = Backbone.View.extend({
	tagName:'li',
	className:'liPage',
	events: {
		"click": "changePage"
	},
	template:_.template($("#pagination").html()),
	render:function(number){
		this.$el.html(this.template({q:number}))
		return this
	},
	changePage: function(){
		/*算个重点，得到backbone中的标签*/
	    allContent.reset()
	    $(".mainUl li").remove()
		var cn = this.$('a').html()-1
		var cp = allContentCache.slice(cn * pinNum,cn * pinNum + pinNum)
        _.each(cp,function(item,i){
        	allContent.add(item)
        })
        new itemsView()
        
	}
})

var Pagination = Backbone.Collection.extend({
	createPagination:function(){
		for (var i = 0; i < Math.ceil(allContentCache.length/pinNum); i++) {
			$('.pagination').append((new paginationView()).render(i+1).$el)
			//把小collection加满
		}
	}
})

var a = new Pagination()
a.createPagination()




