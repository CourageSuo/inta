/**************Model*****************/
var headerTheme = Backbone.Model.extend({
	defaults: {
		title:"hello",
		userName:"登录"
	}
})

/**************Model*****************/
var htView = Backbone.Model.extend({
	mod: new headerTheme,
	template: _.template($('#tpHeader').html()),
	render:function(){
		$('body').append(this.template(this.mod.toJSON()))
	}
})

var htv = new htView()
htv.render()

