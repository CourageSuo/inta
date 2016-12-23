var express = require('express');
var router = express.Router();

var mongojs = require('mongojs')
var formidable = require('formidable')
var path = require('path')
var fs = require('fs')

//private modal
// var cdb = require('../model/cMongo.js')

/* GET users listing. */
router.get('/', function(req, res, next) { 
  var db = mongojs('INTA', ['userNum'])
  db.userNum.find().sort({_id: -1}, function (err, docs) {
    if(err) throw err
    	var max = docs[0]._id
        db.userNum.insert({_id:max+1})
    res.render('login.html',{
    	userNum: max + 1
    })
    db.close()
  })
});


router.post('/:numUser',function(req,res,next){
	var form = new formidable.IncomingForm()
	form.uploadDir = path.join(__dirname,'../public/uploads')
	form.parse(req)
	form.on('file',function(field,file){
		fs.renameSync(file.path,path.join(form.uploadDir,req.params.numUser + file.name))
		res.send(req.params.numUser + file.name)
	})
	

})

//登录注册部分
router.post('/',function(req,res,next){
	if(req.body.flagl === 'login'){
		var luser = req.body.user
		var lpwd = req.body.pass

		var db = mongojs('INTA', ['userNum'])
	    var query = {userName:luser}
	    db.userNum.find(query).toArray(function (err, docs) {
	    	if(docs.length === 0){
	    		res.send('没有用户名')
	    		db.close()
	    	} else {
	    		if(docs[0].userName === luser && docs[0].usePwd === lpwd){
	    			res.cookie('intaUserName',luser,{maxAge:3600000*24*7})
					// res.cookie('intaUserNum',lpwd,{maxAge:3600000*24*7})
	    			res.send('ok')
	    			db.close()
	    		} else {
	    			res.send('学号和密码不正确')
	    			db.close()
	    		}
	    	}
	    })

	} else {
	var arr = req.body.icon
	//判断是否有为默认
	// var iconname = arr.length === 0 ? arr : arr[arr.length - 1] 
	var iconname = null
	var pa = null
	console.log(arr[0] + " and " + arr[1])
	if (arr[1] === 'default.png') {
		iconname = arr[1]
		pa = "/images/"
	} else {
		iconname = arr[arr.length - 1]
		pa = "/uploads/"
	}
	// var iconname = arr[arr.length-1]
	//update to database
	var db = mongojs('INTA', ['userNum'])
	var update = {$set: {userName:req.body.name,userIcon:iconname,usePwd:req.body.pwd,userMobile:req.body.mobile}}
	var query = {_id:parseInt(req.body.num)}//把字符型转化为数值类型
	db.userNum.update(query,update,function(err){
		if(err) throw err
			db.close()
		//设置cookie
		res.cookie('intaUserName',req.body.name,{maxAge:3600000*24*7})
		// res.cookie('intaUserNum',req.body.,{maxAge:3600000*24*7})
		iconname = pa + iconname
		console.log(iconname)
		res.render('index.html',{
			"flag"  : 1,
			"userN" : req.body.name,
			"userIcon" : iconname,
			// 2016-12-19 +
		    "userNo" : parseInt(req.body.num)
		})
		db.close()
	})
	}
})


router.get('/info/out',function(req,res,next){
	res.clearCookie('intaUserName')
    res.clearCookie('intaUserNum')
	res.redirect('/')//清除cookie后，在此请求主页，无cookie
})



module.exports = router;
