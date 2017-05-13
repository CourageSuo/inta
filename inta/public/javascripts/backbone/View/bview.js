var formSubmit = Backbone.View.extend({
	el:"#formSubmit",
	events: {
		"click input": "submitForm"
	},
	submitForm: function(){
		if(user === 'no' && ck === 0){
			alert("请登录后评论")
		} else {
		if($(".form-control").val() == "" || $(".form-control").val() == null){
			alert("评论不能为空")
        } else {
        	var beijingTime = new Date()
        	var created = beijingTime.getFullYear() + '年' + (beijingTime.getMonth() + 1) + '月' + beijingTime.getDate() + '日   ' + beijingTime.getHours() + ':' + (beijingTime.getMinutes()<10?'0':'') + beijingTime.getMinutes()
        	console.log(created)
        	var cont0 = $('.form-control').val().replace(/</g, '&lt;')
            var cont1 = cont0.replace(/>/g,'&gt;')
            var cont2 = cont1.replace(/\r?\n/g, '<br />')
        	var comm = new itemComment({
        		cIcon:icon,//更具cookie找到
        		cAuthor:user,//更具cookie找到
        		cContent:cont2,
        		cDate:created,
        		 _whoseBlog:window.location.hash.substr(6)
        	})

        	var comv = new commentView({model:comm})

        	$('.commentContainer').prepend(comv.render().$el)
        }
        }
	}
})

var blogList = Backbone.View.extend({
	el:"#blogList",
	show: function(){
		this.$el.show()
	},
	hide: function(){
		this.$el.hide()
	}
})

var selfBlog = Backbone.View.extend({
	el:"#selfBlog",
	template:_.template($("#selfBlogTemp").html()),
	show: function(){            
		this.model.content = this.model.content.replace(/\r?\n/g, '<br />')
		this.model.commentNumber = this.model.comment.length

		this.$el.html(this.template(this.model))
		this.changeColor()
		new formSubmit//创建submitform是为了监听事件
		_.each(this.model.comment.reverse(),function(item,i){
			var cModel = new itemComment()
			cModel.url = '/helloworld/comment/' + item
			cModel.fetch({ success: function(){
				var cm = cModel.toJSON()
				$('.commentContainer').append((new haveCommentView({model:cm})).render().$el)
			}})
		})
		this.$el.show()
	},
	hide: function(){
		this.$el.hide()
	},
	changeColor:function(){
		switch(this.model.tag){
			case '文章':
				this.$('.tagStyleBlog').css('background-color','#00A388')
				break;
			case '问题':
				this.$('.tagStyleBlog').css('background-color','#e67e22')
				break;
			case '学习资料':
				this.$('.tagStyleBlog').css('background-color','#27ae60')
				break;
			case '培训这些事儿':
				this.$('.tagStyleBlog').css('background-color','#9b59b6')
				break;
			case '何事囧':
				this.$('.tagStyleBlog').css('background-color','#FF6138')
				break;
			default:
			    console.log(this.model.get('tag'))
		}
	}
})

var bl = new blogList();
