var mongoose = require('mongoose')
var moment = require('moment')

var dbURI = 'mongodb://inta:mnbv8765@localhost/INTA'
mongoose.Promise = global.Promise
mongoose.connect(dbURI)


var comment = {
    cIcon:String,
    cAuthor:String,
    cContent:String,
    cDate:String,
    _whoseBlog: mongoose.Schema.Types.ObjectId
}


var schema = {
    icon:String,
    title:String,
    author:String,
    tag:String,
    content:String,
    createdOn:String,
    link:String,
    uploadImg:String,
    linkPic:String,

    comment:[{type: mongoose.Schema.Types.ObjectId, ref: 'commentBlog'}],
    readNumber:{type:Number,default:0},
    commentNumber:{type:Number,default:0},
    category:{type:String,default:"Hello,World"}
}

var userSchema = new mongoose.Schema(schema)//类似于创schema类
var commentSchema = new mongoose.Schema(comment)


var commentBlog = mongoose.model('comment',commentSchema)//这里的model会自动创建集合Collections
var userBlog = mongoose.model('userBlog',userSchema)//Model CRUD



var writeDb = function(){
    var userOne = new userBlog()//javascript object
	var sch = Object.keys(schema)
	var arg = arguments//pass into callback below in save
    var i;
    for (i = 0; i < arguments.length - 1; i++) {
        userOne[sch[i]] = arguments[i]
        console.log(arguments[i])
    }
    userOne.save(function(err){
    	if (err) console.log(err)
            userBlog.find({},function(err,data){
                if(err) return handleError(err)
                    arg[arg.length-1](data)
            })	
    })
}

var findAll = function(callback){
    userBlog.find({},function(err,data){
        if(err) return handleError(err)
            callback(data)
    })
}

var addCommentToBlog = function(whoseBlog,icon,author,content,date,callback){
    var comBlog = new commentBlog({cIcon:icon,cAuthor:author,cContent:content,cDate:date,_whoseBlog:whoseBlog})
    comBlog.save(function(err){
        if (err) return handleError(err)
            userBlog.findOne({_id:whoseBlog},function(err,doc){
                if (err) return handleError(err)
                    doc.comment.push(comBlog._id)
                    doc.save(function(err){
                        if(err) return handleError(err)
                            callback()
                    })
            })
    })
}

var fetchComment = function(fid,callback){
    commentBlog.findOne({_id:fid},function(err,doc){
        if(err) return handleError(err)
            callback(doc)
    })
}

var addReadNumber = function(numb){
    console.log(numb)
    userBlog.findByIdAndUpdate(numb,{$inc:{"readNumber":1}},function(err,data){})
}

module.exports.writeDb = writeDb
module.exports.findAll = findAll
module.exports.addCommentToBlog = addCommentToBlog
module.exports.fetchComment = fetchComment
module.exports.addReadNumber = addReadNumber