var express = require('express');
var router = express.Router();


//private modal
var cdb = require('../model/cMongo.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.intaUserName === undefined) {
  	res.render('index.html',{
  		"flag": 0
  	});
  } else {
  	cdb.cMongoIcon(req.cookies.intaUserName,function(err,db,icon,uid){
  		// var iconUrl = '/uploads/' + icon
  		var iconUrl = icon === 'default.png' ? '/images/' + icon : '/uploads/' + icon 
  		res.render('index.html',{
  			"flag": 1,
  			"userN": req.cookies.intaUserName,
  			"userIcon" : iconUrl,
        "userNo" : uid
  		})
  		db.close()
  	})

  }
  
});


router.get('/compedium/:name',function(req,res,next) {
  if(req.cookies.intaUserName === undefined) {
  	res.render(req.params.name + '.html',{
  		"flag": 0
  	});
  } else {	

  	cdb.cMongoIcon(req.cookies.intaUserName,function(err,db,icon,uid){
  		// var iconUrl = '/uploads/' + icon
  		var iconUrl = icon === 'default.png' ? '/images/' + icon : '/uploads/' + icon 
  		res.render(req.params.name + '.html',{
  			"flag": 1,
  			"userN": req.cookies.intaUserName,
  			"userIcon" : iconUrl,
        "userNo" : uid
  		})
  		db.close()
  	})
  }
})

router.get('/course/:course/:num',function(req,res,next) {

	var courseKey = req.app.get('coursejson')
	var urlParam = req.params.course + '/' + req.params.num
  var courseNum = req.params.course + '_' + req.params.num
	var courseContent = courseKey[urlParam]//使用中括号访问数据

    if(req.cookies.intaUserName === undefined) {
    	res.render('course.html',{
    		"flag": 0,
    		"courseContent": JSON.stringify(courseContent),
        "courseComment": 0,
        "userN":0,
        "userIcon":0,
        "showCouserName" : req.params.course,
        "nnn" :  req.params.num
    	})
    } else {	
  
    	cdb.cMongoIcon(req.cookies.intaUserName,function(err,db,icon,uid) {

    		var iconUrl = icon === 'default.png' ? '/images/' + icon : '/uploads/' + icon
        
        db.collection('course').findOne({_id:courseNum},function(err,doc){
          if(err) throw err
          console.log(doc)
          res.render('course.html',{
            "courseContent": JSON.stringify(courseContent),
            "courseComment": JSON.stringify(doc),
            "flag": 1,
            "userN": req.cookies.intaUserName,
            "userIcon" : iconUrl,
            "userNo" : uid,
            "showCouserName" : req.params.course,
            "nnn" :  req.params.num  
          })
          db.close()
        })
    		
    	})	
    }
})

//ajax提交回复
router.post('/course/:course/:num',function(req,res,next) {

     var un = req.body.nameComment//提交上来的用户名
     var ucomment = req.body.comment//提交上来的评论内容
     var udt = req.body.cDateTime//提交上来的时间
     var uicon = req.body.iconComment//提交上来图片
     var uboolean = req.body.boolean//判断是否是评论还是回复
     var ucid = req.body.cIndex//传上来的索引值
     var courseNum = req.params.course + '_' + req.params.num //得到具体的课程

     var uInfo = {cName:un,cIcon:uicon,cComment:ucomment,cDate:udt,cBool:uboolean}

     if(ucid) {
        /******************************/
        // 评复五：根据ucid，把提交上来的uInfo更新的相应的数组元素中
        //       返回的就是带有子集数组中的数组了
        /******************************/
        
        cdb.cMongoReply(ucid,courseNum,uInfo,function(err,db){
          if(err) throw err
            var cj = JSON.stringify(uInfo)
            res.send( cj )
            db.close()
            // db.course.findOne({_id:courseNum},function(err,doc){
            //   if(err) throw err
            //     var courseJson = JSON.stringify(doc.courseComment)
            //     res.send( courseJson)
            //     db.close()
            // })
        })

     } else {
        cdb.cMongoComment(courseNum,uInfo,function(err,db){
           if(err) throw err
             //返回评论 名字 头像
             db.course.findOne({_id:courseNum},function(err,doc){
               if(err) throw err
                var courseJson = JSON.stringify(doc.courseComment)
                res.send( courseJson )
                db.close()
             })
        })
     }

     // cdb.cMongoComment(courseNum,uInfo,function(err,db){
     //    if(err) throw err
     //      //返回评论 名字 头像
     //      db.course.findOne({_id:courseNum},function(err,doc){
     //        if(err) throw err
     //         var courseJson = JSON.stringify(doc.courseComment)
     //         res.send( courseJson )
     //         db.close()
     //      })
     // })

})



module.exports = router;
