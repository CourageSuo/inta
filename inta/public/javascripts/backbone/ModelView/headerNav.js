var ck = 0;

var hCookie = Backbone.View.extend({
	el:"#hlogin",
	template:_.template($('#tpHeader2').html()),
	initialize:function(){
		this.$el.append(this.template({name:this.model}))
		ck = 0;
	}
})

var nCookie = Backbone.View.extend({

	el:"#nlogin",
	template:_.template($('#tpHeader').html()),

	events:{
		'click #login': 'loginContent'
	},



	loginContent: function(){
		var self = this
		$.post('/helloworld/login',{
			userName:$('.logNum').val(),
			passWord:$('.logPass').val()
		},function(data){
			if(data === 'nouser' || data === 'incorrect'){
				alert('用户名或密码不正确')
			} else {
				self.remove()
				new hCookie({model:data})
				ck = 1;
			}
		})
	},

	initialize:function(){
		this.$el.append(this.template())
	}
})

if(user === 'no'){
	new nCookie
} else {
	new hCookie({model:user})
}



