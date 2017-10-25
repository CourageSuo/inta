var express = require('express');
var https = require('https')
var sha1 = require('sha1')
var rs = require('randomstring')
var router = express.Router();

var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx41719e0c25766535&secret=93af0348d0c1c658eb004c57e6008af8"

//获得access_token
router.get("/",function(req,res){
	https.get(url,function(res1){
		res1.on('data',function(chunck){
			var at = JSON.parse(chunck.toString())
			//获得jsapi_ticket
			var jsUrl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + at.access_token + "&type=jsapi"
			https.get(jsUrl,function(res2){
				res2.on('data',function(chunck){
					var timeStamp = Math.floor(Date.now() / 1000)
					var ranString = rs.generate(16)
					var js_ticket = JSON.parse(chunck.toString())
					var string1 = "jsapi_ticket="+js_ticket.ticket+"&noncestr="+ranString+"&timestamp="+timeStamp+"&url=http://www.intalesson.com"
					res.send(JSON.stringify({hash:sha1(string1),time:timeStamp,ranStr:ranString}))
				})
			})
		})
	})
})

module.exports = router;

















