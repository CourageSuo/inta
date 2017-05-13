var itemContent = Backbone.Model.extend({
	default:{
		_id:'',/*当前列表的id，有且只有一个*/
		icon:'',/*就是但钱列表突出左边的头像*/
		title:'',/*顾名思义，就是标题*/
		author:'',/*顾名思义，就是作者*/
		tag:'',/*表示是提问，还是文章，还是知识商店*/
		readNumber:1,/*就是阅读几次*/
		content:'',/*就是内容*/
		createdOn:'',/*什么时间创建的，就是Date*/
		category:''/*富裕一个（富余）*/
	}

})

var itemComment = Backbone.Model.extend({
	urlRoot:'/helloworld/comment'
	// default:{
	// 	_id:'',
	// 	_whoseBlog:'',
	// 	cIcon:'',
	// 	cAuthor:'',
	// 	cContent:'',
	//     cDate:''
	// }
})








