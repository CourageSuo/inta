var xhr = new XMLHttpRequest
xhr.open("GET","/weixin")
xhr.send()
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        weixin(xhr)
    }
}

function weixin(xhr){
var arr = ["onMenuShareTimeline",
           "onMenuShareAppMessage",
           "onMenuShareQQ",
           "onMenuShareWeibo",
           "onMenuShareQZone",
           "startRecord",
           "stopRecord",
           "onVoiceRecordEnd",
           "playVoice",
           "pauseVoice",
           "stopVoice",
           "onVoicePlayEnd",
           "uploadVoice",
           "downloadVoice",
           "chooseImage",
           "previewImage",
           "uploadImage",
           "downloadImage",
           "translateVoice",
           "getNetworkType",
           "openLocation",
           "getLocation",
           "hideOptionMenu",
           "showOptionMenu",
           "hideMenuItems",
           "showMenuItems",
           "hideAllNonBaseMenuItem",
           "showAllNonBaseMenuItem",
           "closeWindow",
           "scanQRCode",
           "chooseWXPay",
           "openProductSpecificView",
           "addCard",
           "chooseCard",
           "openCard"]

var sig = JSON.parse(xhr.responseText)

wx.config({
   debug:true,
   appId:"wx41719e0c25766535",
   timestamp:sig.time,
   nonceStr:"Wm3WZYTPz0wzccnW",
   signature:sig.hash,
   jsApiList: arr
})
wx.ready(function(){
    wx.onMenuShareTimeline({
    title: 'INTA课程', // 分享标题
    link: 'http://www.intalesson.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: '/wechat.jpg', // 分享图标
    success: function () { 
        // 用户确认分享后执行的回调函数
        console.log('c')
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
});

})
wx.error(function(res){
    console.log('b')
});
}


