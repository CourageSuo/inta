var mongojs = require('mongojs')

var connectMongoForIcon = function (name,callback) {
	var db = mongojs('inta:mnbv8765@localhost/INTA')

    db.collection('userNum').find({userName:name}).toArray(function(err,docs){
    	uIcon = docs[0].userIcon
    	uNum = docs[0]._id
    	callback(err,db,uIcon,uNum)
    })
}

var putMongoForComment = function(courseName,userInfo,callback) {
	var db = mongojs('INTA',['course'])
	db.course.update({_id:courseName},{$addToSet:{courseComment:userInfo}},function(err){
		callback(err,db)
	})
}

var replyForComment = function(ucid,courseName,userInfo,callback) {
	var db = mongojs('INTA',['course'])
	var ats = {$addToSet:{}}
	ats.$addToSet['courseComment.' + ucid + '.commentReply'] = userInfo

	db.course.update({_id:courseName},ats,function(err){
		callback(err,db)
	})
}

var clickStatistics = function(courseName) {
	var db = mongojs('INTA',['cliStat'])
	db.cliStat.update({_id:courseName},{$inc:{"number":1}})
	db.close()
	
}

var myInta = function(callback){
	var db = mongojs('INTA')
	db.cliStat.find(function(err,doc){
		callback(err,doc,db)
	})
}

var cornerConnect = function(courseName,callback) {
	var db = mongojs('INTA')
	db.collection(courseName).find(function(err,doc){
		callback(err,doc,db)
	})
}

var cornerInsert = function(courseName){
	var db = mongojs('INTA')
	db.cliStat.update({_id:courseName},{$inc:{"like":1}})
	db.close()

}

module.exports.cMongoIcon = connectMongoForIcon
module.exports.cMongoComment = putMongoForComment
module.exports.cMongoReply = replyForComment
module.exports.cMongoStatic = clickStatistics
module.exports.myInta = myInta
module.exports.cornerConnect = cornerConnect
module.exports.cornerInsert = cornerInsert



