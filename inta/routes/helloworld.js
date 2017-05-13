'use strict'
var express = require('express');
var CRUD = require('../model/hMongo.js')
// var handleCookie = require('../model/hCookie.js')
var mongojs = require('mongojs')
var cdb = require('../model/cMongo.js')

var multer = require('multer')
var uploads = multer({ dest : './public/blogImg/'})

var router = express.Router();

//1.this is classic MVC 'C'
var helloworld = function(req,res,next){
    CRUD.findAll(function(userBlogs){
        if(req.cookies.intaUserName === undefined){
            res.render('hw/helloworld.html',{iun:"no",ico:"no",listContent:userBlogs})
        } else {
            cdb.cMongoIcon(req.cookies.intaUserName,function(err,db,icon,uid){
                var iconUrl = icon === 'default.png' ? '/images/' + icon : '/uploads/' + icon
                res.render('hw/helloworld.html',{iun:req.cookies.intaUserName,ico:iconUrl,listContent:userBlogs})
                db.close()
            })
        }
    })
}
router.get('/',helloworld)

//1.1 login to the cookie
var authentication = function(req,res,next){
	var luser = req.body.userName
	var lpwd  = req.body.passWord
    var db = mongojs('INTA', ['userNum'])
    var query = {userName:luser}
    db.userNum.find(query).toArray(function (err, docs) {
    	if(docs.length === 0){
    		res.send('nouser')
    		db.close()
    	} else {
    		if(docs[0].userName === luser && docs[0].usePwd === lpwd){
    			res.cookie('intaUserName',luser,{maxAge:3600000*24*7})
    			res.send(luser)
    			db.close()
    		} else {
    			res.send('incorrect')
    			db.close()
    		}
    	}
    })
}
router.post('/login',authentication)

//2.public page
var publicPage = function(req,res,next){
	res.render('hw/public.html')
}
router.get('/public',publicPage)


//4.receive hello world publish
var publicRec = function(req,res,next){
    var db = mongojs('INTA', ['userNum'])
    var query = {userName:req.cookies.intaUserName}
    db.userNum.findOne(query,function(err,doc){
        var icon = doc.userIcon
        var name = doc.userName
        var title = req.body.title

        var content0 = req.body.content.replace(/</g, '&lt;')
        var content = content0.replace(/>/g,'&gt;')

        var tag = req.body.tag

        var beijingTime = new Date()
        var created = beijingTime.getFullYear() + '年' + (beijingTime.getMonth() + 1) + '月' + beijingTime.getDate() + '日   ' + beijingTime.getHours() + ':' + (beijingTime.getMinutes()<10?'0':'' + beijingTime.getMinutes())

        var link = req.body.link
        var uploadImg = req.file === undefined ? '' : req.file.filename

        var linkPic = req.body.link === '' ? 'hidden' : req.body.link
        
        CRUD.writeDb(icon,title,name,tag,content,created,link,uploadImg,linkPic,function(userBlogs){
            res.render('hw/helloworld.html',{iun:req.cookies.intaUserName,ico:icon,listContent:userBlogs})
        })
    })
}
router.post('/public',uploads.single('blogImg'),publicRec)


//5.comment for blog
//不用他展示数据的
var forComment = function(req,res,next){
    console.log(req.body)
    CRUD.addCommentToBlog(req.body._whoseBlog,req.body.cIcon,req.body.cAuthor,req.body.cContent,req.body.cDate,function(err){
         res.send('success')
    })
}
router.post('/comment',forComment)

//6.fetch comment model
var listComment = function(req,res,next){
    CRUD.fetchComment(req.params.id,function(doc){
        res.send(doc)
    })
}
router.get('/comment/:id',listComment)

//7 非常简单，增加多少人阅读
var addRead = function(req,res,next){
    CRUD.addReadNumber(req.params.num)
}
router.get('/addRead/:num',addRead)

module.exports = router;


















