var p=0
$(".sublimec2").click(function(){
  if(p<2){
    $.ajax({
      url:'/like',
      type:'get',
      data:{"oneLike":"sublime"}, //get请求时数据
      dataType:'json', //get请求时的数据格式
      success:function(data){
        $(".sublimelnum").text(parseInt(data))
      },
      error:function(request,error){
        alert("Request: "+JSON.stringify(request));
      }
    }) 
  } else {
    $(".sublimec2").attr('src','images/corner/like1.png')
  }
     p++           
})

$(".sublimec1").hover(function(){ $(".sublimec1a").css("visibility","visible") },function(){ $(".sublimec1a").css("visibility","hidden") })
$(".sublimec2").hover(function(){ $(".sublimec2a").css("visibility","visible") },function(){ $(".sublimec2a").css("visibility","hidden") })
$(".sublimec3").hover(function(){ $(".sublimec3a").css("visibility","visible") },function(){ $(".sublimec3a").css("visibility","hidden") })
$(".sublimec4").hover(function(){ $(".sublimec4a").css("visibility","visible") },function(){ $(".sublimec4a").css("visibility","hidden") })


          var i=0
          $(".gitc2").click(function(){
            if(i<2){
              $.ajax({
                url:'/like',
                type:'get',
                data:{"oneLike":"git"}, //get请求时数据
                dataType:'json', //get请求时的数据格式
                success:function(data){
                  $(".gitlnum").text(parseInt(data))
                },
                error:function(request,error){
                  alert("Request: "+JSON.stringify(request));
                }
              }) 
            } else {
              $(".gitc2").attr('src','images/corner/like1.png')
            }
               i++           
          })


          $(".gitc1").hover(function(){ $(".gitc1a").css("visibility","visible") },function(){ $(".gitc1a").css("visibility","hidden") })
          $(".gitc2").hover(function(){ $(".gitc2a").css("visibility","visible") },function(){ $(".gitc2a").css("visibility","hidden") })
          $(".gitc3").hover(function(){ $(".gitc3a").css("visibility","visible") },function(){ $(".gitc3a").css("visibility","hidden") })
          $(".gitc4").hover(function(){ $(".gitc4a").css("visibility","visible") },function(){ $(".gitc4a").css("visibility","hidden") })


          var j=0
          $(".learnc2").click(function(){
            if(j<2){
              $.ajax({
                url:'/like',
                type:'get',
                data:{"oneLike":"learn"}, //get请求时数据
                dataType:'json', //get请求时的数据格式
                success:function(data){
                  $(".learnlnum").text(parseInt(data))
                },
                error:function(request,error){
                  alert("Request: "+JSON.stringify(request));
                }
              }) 
            } else {
              $(".learnc2").attr('src','images/corner/like1.png')
            }
               j++           
          })

                    $(".learnc1").hover(function(){ $(".learnc1a").css("visibility","visible") },function(){ $(".learnc1a").css("visibility","hidden") })
          $(".learnc2").hover(function(){ $(".learnc2a").css("visibility","visible") },function(){ $(".learnc2a").css("visibility","hidden") })
          $(".learnc3").hover(function(){ $(".learnc3a").css("visibility","visible") },function(){ $(".learnc3a").css("visibility","hidden") })
          $(".learnc4").hover(function(){ $(".learnc4a").css("visibility","visible") },function(){ $(".learnc4a").css("visibility","hidden") })

          var k=0
          $(".nodec2").click(function(){
            if(k<2){
              $.ajax({
                url:'/like',
                type:'get',
                data:{"oneLike":"node"}, //get请求时数据
                dataType:'json', //get请求时的数据格式
                success:function(data){
                  $(".nodelnum").text(parseInt(data))
                },
                error:function(request,error){
                  alert("Request: "+JSON.stringify(request));
                }
              }) 
            } else {
              $(".nodec2").attr('src','images/corner/like1.png')
            }
               k++           
          })

                    $(".nodec1").hover(function(){ $(".nodec1a").css("visibility","visible") },function(){ $(".nodec1a").css("visibility","hidden") })
          $(".nodec2").hover(function(){ $(".nodec2a").css("visibility","visible") },function(){ $(".nodec2a").css("visibility","hidden") })
          $(".nodec3").hover(function(){ $(".nodec3a").css("visibility","visible") },function(){ $(".nodec3a").css("visibility","hidden") })
          $(".nodec4").hover(function(){ $(".nodec4a").css("visibility","visible") },function(){ $(".nodec4a").css("visibility","hidden") })

                    var l=0
          $(".npmc2").click(function(){
            if(l<2){
              $.ajax({
                url:'/like',
                type:'get',
                data:{"oneLike":"npm"}, //get请求时数据
                dataType:'json', //get请求时的数据格式
                success:function(data){
                  $(".npmlnum").text(parseInt(data))
                },
                error:function(request,error){
                  alert("Request: "+JSON.stringify(request));
                }
              }) 
            } else {
              $(".npmc2").attr('src','images/corner/like1.png')
            }
               l++           
          })


                    $(".npmc1").hover(function(){ $(".npmc1a").css("visibility","visible") },function(){ $(".npmc1a").css("visibility","hidden") })
          $(".npmc2").hover(function(){ $(".npmc2a").css("visibility","visible") },function(){ $(".npmc2a").css("visibility","hidden") })
          $(".npmc3").hover(function(){ $(".npmc3a").css("visibility","visible") },function(){ $(".npmc3a").css("visibility","hidden") })
          $(".npmc4").hover(function(){ $(".npmc4a").css("visibility","visible") },function(){ $(".npmc4a").css("visibility","hidden") })

                    var m=0
          $(".expressc2").click(function(){
            if(m<2){
              $.ajax({
                url:'/like',
                type:'get',
                data:{"oneLike":"express"}, //get请求时数据
                dataType:'json', //get请求时的数据格式
                success:function(data){
                  $(".expresslnum").text(parseInt(data))
                },
                error:function(request,error){
                  alert("Request: "+JSON.stringify(request));
                }
              }) 
            } else {
              $(".expressc2").attr('src','images/corner/like1.png')
            }
               m++           
          })

                    $(".expressc1").hover(function(){ $(".expressc1a").css("visibility","visible") },function(){ $(".expressc1a").css("visibility","hidden") })
          $(".expressc2").hover(function(){ $(".expressc2a").css("visibility","visible") },function(){ $(".expressc2a").css("visibility","hidden") })
          $(".expressc3").hover(function(){ $(".expressc3a").css("visibility","visible") },function(){ $(".expressc3a").css("visibility","hidden") })
          $(".expressc4").hover(function(){ $(".expressc4a").css("visibility","visible") },function(){ $(".expressc4a").css("visibility","hidden") })

                    var n=0
          $(".gruntc2").click(function(){
            if(n<2){
              $.ajax({
                url:'/like',
                type:'get',
                data:{"oneLike":"grunt"}, //get请求时数据
                dataType:'json', //get请求时的数据格式
                success:function(data){
                  $(".gruntlnum").text(parseInt(data))
                },
                error:function(request,error){
                  alert("Request: "+JSON.stringify(request));
                }
              }) 
            } else {
              $(".gruntc2").attr('src','images/corner/like1.png')
            }
               n++           
          })


                    $(".gruntc1").hover(function(){ $(".gruntc1a").css("visibility","visible") },function(){ $(".gruntc1a").css("visibility","hidden") })
          $(".gruntc2").hover(function(){ $(".gruntc2a").css("visibility","visible") },function(){ $(".gruntc2a").css("visibility","hidden") })
          $(".gruntc3").hover(function(){ $(".gruntc3a").css("visibility","visible") },function(){ $(".gruntc3a").css("visibility","hidden") })
          $(".gruntc4").hover(function(){ $(".gruntc4a").css("visibility","visible") },function(){ $(".gruntc4a").css("visibility","hidden") })

                    var o=0
          $(".sassc2").click(function(){
            if(o<2){
              $.ajax({
                url:'/like',
                type:'get',
                data:{"oneLike":"sass"}, //get请求时数据
                dataType:'json', //get请求时的数据格式
                success:function(data){
                  $(".sasslnum").text(parseInt(data))
                },
                error:function(request,error){
                  alert("Request: "+JSON.stringify(request));
                }
              }) 
            } else {
              $(".sassc2").attr('src','images/corner/like1.png')
            }
               o++           
          })

                    $(".sassc1").hover(function(){ $(".sassc1a").css("visibility","visible") },function(){ $(".sassc1a").css("visibility","hidden") })
          $(".sassc2").hover(function(){ $(".sassc2a").css("visibility","visible") },function(){ $(".sassc2a").css("visibility","hidden") })
          $(".sassc3").hover(function(){ $(".sassc3a").css("visibility","visible") },function(){ $(".sassc3a").css("visibility","hidden") })
          $(".sassc4").hover(function(){ $(".sassc4a").css("visibility","visible") },function(){ $(".sassc4a").css("visibility","hidden") })

                    var p=0
          $(".phantomc2").click(function(){
            if(p<2){
              $.ajax({
                url:'/like',
                type:'get',
                data:{"oneLike":"phantom"}, //get请求时数据
                dataType:'json', //get请求时的数据格式
                success:function(data){
                  $(".phantomlnum").text(parseInt(data))
                },
                error:function(request,error){
                  alert("Request: "+JSON.stringify(request));
                }
              }) 
            } else {
              $(".phantomc2").attr('src','images/corner/like1.png')
            }
               p++           
          })

                    $(".phantomc1").hover(function(){ $(".phantomc1a").css("visibility","visible") },function(){ $(".phantomc1a").css("visibility","hidden") })
          $(".phantomc2").hover(function(){ $(".phantomc2a").css("visibility","visible") },function(){ $(".phantomc2a").css("visibility","hidden") })
          $(".phantomc3").hover(function(){ $(".phantomc3a").css("visibility","visible") },function(){ $(".phantomc3a").css("visibility","hidden") })
          $(".phantomc4").hover(function(){ $(".phantomc4a").css("visibility","visible") },function(){ $(".phantomc4a").css("visibility","hidden") })

                    var p=0
          $(".autolayoutc2").click(function(){
            if(p<2){
              $.ajax({
                url:'/like',
                type:'get',
                data:{"oneLike":"autolayout"}, //get请求时数据
                dataType:'json', //get请求时的数据格式
                success:function(data){
                  $(".autolayoutlnum").text(parseInt(data))
                },
                error:function(request,error){
                  alert("Request: "+JSON.stringify(request));
                }
              }) 
            } else {
              $(".autolayoutc2").attr('src','images/corner/like1.png')
            }
               p++           
          })

                    $(".autolayoutc1").hover(function(){ $(".autolayoutc1a").css("visibility","visible") },function(){ $(".autolayoutc1a").css("visibility","hidden") })
          $(".autolayoutc2").hover(function(){ $(".autolayoutc2a").css("visibility","visible") },function(){ $(".autolayoutc2a").css("visibility","hidden") })
          $(".autolayoutc3").hover(function(){ $(".autolayoutc3a").css("visibility","visible") },function(){ $(".autolayoutc3a").css("visibility","hidden") })
          $(".autolayoutc4").hover(function(){ $(".autolayoutc4a").css("visibility","visible") },function(){ $(".autolayoutc4a").css("visibility","hidden") })



