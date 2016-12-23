        // var cocm = <%- courseComment %>
         var objCC = cocm.courseComment
        //返回数据，显示列表
        $.each(objCC,function(index,item){
        /******************************/
        // 评复二：遍历数据库中courseComment中,所有的数组对象，并为回复按钮，进行id设置，见2.2
        /******************************/
        $("#insertComment").prepend('<div class="media" style="clear:both">' + 
                                    '<div class="media-left">' + 
                                     '<img  class="media-object userIcon" style="width:50px">' + 
                                    '</div>' + 
                                    '<div class="media-body">' + 
                                     '<h4 class="media-heading userName"></h4>' + 
                                     '<p class="userComment"></p>' + 
                                    '<div class="text-right">' +
                                    '<small style="float:left"><i class="timeData"></i></small>' + 
                                    // '<button type="button" class="onlyBtn btn btn-success btn-xs" data-toggle="collapse" data-target="#demo">回复</button>' +
                                    '<button type="button" class="btn btn-success btn-xs replya showComment" >回复</button>' +
                                    '<div class="meida reply"></div>' +
                                    '</div>' +
                                    '</div>'
                                    )
        //评复2.2：设置回复button的id, 更具each中的index
        $(".replya:first").attr("index_id",index)
        $(".reply:first").attr("m_id",index)

        // $(".reply:last").append('<div class="media">' +
        //                             '<div class="media-left">' + 
        //                              '<img  class="media-object userIcon" style="width:50px">' + 
        //                             '</div>' + 
        //                             '<div class="media-body">' + 
        //                              '<h4 class="media-heading userName" style="float:left"></h4>' + 
        //                              '<p class="userComment" style="float:left"></p>' + 
        //                             '</div>' + 
        //                             '<div class="text-right">' +
        //                             '<small style="float:left"><i class="timeData"></i></small>' + 
        //                             '<button id="replya" type="button" class="btn btn-success btn-xs" >回复</button>' +
        //                             '</div>' +
        //                             '</div>'
        //                             )


        $(".userName:first").text(item.cName)
        $(".userIcon:first").attr('src',item.cIcon)
        $(".userComment:first").text(item.cComment)
        $(".timeData:first").text(item.cDate)
        })

        /******************************/
        // 评复三：点击回复，把输入框添加到，点击回复的div下
        //        并把div设置成button的索引
        /******************************/
        //不仅有回复，当然有点击提问的时候的相应，下边这个判断，可不能在删了

        //下面这个方法就可以,监听着任何加入的元素
         $(".commentPart").on("click",".showComment",function(event){
          if($(this).attr('id') === 'critica') {
            $( "#forCritic" ).insertAfter($(this).parent());
            $(this).attr('data-toggle','collapse')
            $(this).attr('data-target','#forCritic')
          } else {
 
            $( "#forReply" ).insertAfter($(this).parent());//既然他是直接加到，button的parent下，就可以反过来找
            $(this).attr('data-toggle','collapse')
            $(this).attr('data-target','#forReply')
            $("#forReply").attr('db_index',$(this).attr('index_id'))
          }
        });

        