var express = require('express');
var router = express.Router();


//private modal
var cdb = require('../model/cMongo.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  cdb.cMongoStatic("statistic")//这个就是错的，因为在数据cMongo中就没用这个参数
  cdb.cornerConnect("cliStat",function(err,doc,db){

  if(req.cookies.intaUserName === undefined) {
    // console.log(click)
    res.render('index.html',{
      "flag": 0,
      "gitc": doc[1].number,
      "gitl": doc[1].like,
      "learnc": doc[9].number,
      "learnl": doc[9].like,
      "nodec": doc[3].number,
      "nodel": doc[3].like,
      "npmc": doc[2].number,
      "npml": doc[2].like,
      "expressc": doc[4].number,
      "expressl": doc[4].like,
      "gruntc": doc[6].number,
      "gruntl": doc[6].like,
      "sassc": doc[5].number,
      "sassl": doc[5].like,
      "autolayoutc": doc[7].number,
      "autolayoutl": doc[7].like
    });
  } else {
    cdb.cMongoIcon(req.cookies.intaUserName,function(err,db,icon,uid){
      // var iconUrl = '/uploads/' + icon
      var iconUrl = icon === 'default.png' ? '/images/' + icon : '/uploads/' + icon 
      res.render('index.html',{
        "flag": 1,
        "userN": req.cookies.intaUserName,
        "userIcon" : iconUrl,
        "userNo" : uid,
      "gitc": doc[1].number,
      "gitl": doc[1].like,
      "learnc": doc[9].number,
      "learnl": doc[9].like,
      "nodec": doc[3].number,
      "nodel": doc[3].like,
      "npmc": doc[2].number,
      "npml": doc[2].like,
      "expressc": doc[4].number,
      "expressl": doc[4].like,
      "gruntc": doc[6].number,
      "gruntl": doc[6].like,
      "sassc": doc[5].number,
      "sassl": doc[5].like,
      "autolayoutc": doc[7].number,
      "autolayoutl": doc[7].like
      })
      // db.close()
    })

  }
      db.close()
  })
  
});


router.get('/compedium/:name',function(req,res,next) {
  //增加对每个课程点击量的统计
  cdb.cMongoStatic(req.params.name)

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
    	 // res.render('course.html',{
        // var mjs = require('mongojs')
        var db = require('mongojs')('INTA')
        db.collection('course').findOne({_id:courseNum},function(err,doc){
          if(err) throw err
          res.render('course.html',{
            "courseContent": JSON.stringify(courseContent),
            "courseComment": JSON.stringify(doc),
            "flag": 0,
            "userN": 0,
            "userIcon" : 0,
            "showCouserName" : req.params.course,
            "nnn" :  req.params.num  
          })
          db.close()
        })
        
      
    	// 	"flag": 0,
    	// 	"courseContent": JSON.stringify(courseContent),
     //    "courseComment": 0,
     //    "userN":0,
     //    "userIcon":0,
     //    "showCouserName" : req.params.course,
     //    "nnn" :  req.params.num
    	// })
    } else {	
  
    	cdb.cMongoIcon(req.cookies.intaUserName,function(err,db,icon,uid) {

    		var iconUrl = icon === 'default.png' ? '/images/' + icon : '/uploads/' + icon
        
        db.collection('course').findOne({_id:courseNum},function(err,doc){
          if(err) throw err
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

router.get('/introduction',function(req,res,next){

   res.render('./introduction/self.html')

})

//点赞的ajax请求
router.get('/like',function(req,res){
    cdb.cornerInsert(req.query.oneLike)
    cdb.cornerConnect("cliStat",function(err,doc,db){
      var result = doc.filter(function( obj ) {
                       return obj._id == req.query.oneLike
                   })
      console.log(result)
      res.send(String(result[0].like))
      db.close()
    })
})

// 统计用户即网站浏览次数
router.get('/myinta', function(req, res, next) {


  cdb.myInta(function(err,doc,db){
    res.render('./myinta/myinta.html',{
      "allNumber":doc
    })
    db.close()
  })
  
})

//等待发表的网页
router.get('/intabaidu',function(req,res,next) {
  res.render('./waiting/waitke.html')
})






module.exports = router;
