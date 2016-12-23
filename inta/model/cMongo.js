var mongojs = require('mongojs')

var connectMongoForIcon = function (name,callback) {
	var db = mongojs('INTA')

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

module.exports.cMongoIcon = connectMongoForIcon
module.exports.cMongoComment = putMongoForComment
module.exports.cMongoReply = replyForComment