      //判断是否有用户，并使用ajax提交表单
      $( ".target" ).submit(function( event ) {
        //判断是评论还是回复
        if($(this).parent().attr("id") === "forCritic") {

          if (flag) {
        
            var url = location.href // the script where you handle the form input.

            //获得当前日期和时间
            var dt = new Date()
            var date = $.datepicker.formatDate('dd M yy', new Date())
            function pad(d) {
              return (d < 10) ? '0' + d.toString() : d.toString();
            }
            var time = dt.getHours() + ":" + pad(dt.getMinutes()) + ":" + pad(dt.getSeconds())
            var timeDate = date + ' - ' + time 

            $(".dtCritic").val(timeDate)
            /********时间获取完毕并赋值**********/
        
            $.ajax({
             type: "POST",
             url: url,
             data: $(".tCritic").serialize(), // serializes the form's elements.
             success: function(data) {

                  var obj = JSON.parse(data)
                  var last_element = obj[obj.length - 1]
                 $("#insertComment").prepend( 
                    '<div class="media" style="clear:both" id="test">' + 
                    '<div class="media-left">' + 
                     '<img  class="media-object userIcon" style="width:50px">' + 
                    '</div>' + 
                    '<div class="media-body">' + 
                     '<h4 class="media-heading userName"></h4>' + 
                     '<p class="userComment"></p>' + 
                     '<div class="text-right">' +
                      '<small style="float:left"><i class="timeData"></i></small>' + 
                      // '<button type="button" class="btn btn-success btn-xs replya showComment" ></button>' +
                      '<div class="meida reply"></div>' +
                     '</div>' +
                    '</div>' +
                    '</div>'
                    )  
              
                  $(".userName:first").text(last_element.cName)
                  $(".userIcon:first").attr('src',last_element.cIcon)
                  var  c =last_element.cComment
                  
                  text = c.replace(/\r?\n/g, '<br />');
                  $(".userComment:first").html(text)
                  
                  $(".timeData:first").text(last_element.cDate)
                }
            })
          
          $(".comment").val('')  //把textarea清空
          event.preventDefault(); // avoid to execute the actual submit of the form.
           // });

          } else {

          alert( "<h3>您还没有登录inta，请登录后提问。</h3>" );
          event.preventDefault();
          }

        } else { //这里的括号代表判断是否是评论按钮结束
        /*****************/
        //评复一：针对不同的button，提交不同的表单，把3个id改成了class 就那个3个特殊的而且成功提交到
        // 数据库，且cBool为正确显示
        /*****************/
        //！！！！！如果要是回复***************************************
          if (flag) {
            // $("#target").submit(function(e) {
        
            var url = location.href // the script where you handle the form input.

            //获得当前日期和时间
            var dt = new Date()
            var date = $.datepicker.formatDate('dd M yy', new Date())
            function pad(d) {
              return (d < 10) ? '0' + d.toString() : d.toString();
            }
            var time = dt.getHours() + ":" + pad(dt.getMinutes()) + ":" + pad(dt.getSeconds())
            var timeDate = date + time 

            $(".dtComment").val(timeDate)
            /********时间获取完毕并赋值**********/


        /******************************/
        // 评复四：由于在回复3中，已设置回复框div的索引，故把回复框的索引通过input传递给服务器
        //        判断是否有索引值，来决定是否插入相应field中的元素，见index.js router.post('/course/:course/:num')
        /******************************/
            var tt = $(this).parent().attr("db_index")
            $(".idComment").val(tt.toString())
        
            $.ajax({
             type: "POST",
             url: url,
             data: $(".tComment").serialize(), // serializes the form's elements.
             success: function(data) {

        /******************************/
        // 评复六：这里只是提交，并没有使用showComment.js展示，并添加index_id
        //        这里只需要插入的当前文件的div即可 
        //        1.找到this的同胞的下一个div
        /******************************/
                
                
                  var obj = JSON.parse(data)

                  console.log($("#forReply").prev().find(".reply"))
  
                   $("#forReply").prev().find(".reply").prepend(
                   // $(".reply").prepend(
                    '<div class="media">' + 
                    '<div class="media-left">' + 
                     '<img  class="media-object userIcon1" style="width:50px">' + 
                    '</div>' + 
                    '<div class="media-body text-left">' + 
                     '<h4 class="media-heading userName1"></h4>' + 
                     '<p class="userComment1"></p>' + 
                    '<div class="text-right">' +
                    '<small style="float:left"><i class="timeData1"></i></small>' + 
                    // '<button type="button" class="btn btn-success btn-xs replya showComment" >回复</button>' +
                    '<div class="meida reply"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                    )
                    
        //6.1下面只是找到，刚提回复的内容，所以都加上1了
                  $(".userName1:first").text(obj.cName)
                  $(".userIcon1:first").attr('src',obj.cIcon)
                  $(".userComment1:first").text(obj.cComment)
                  $(".timeData1:first").text(obj.cDate)
                }
            });
          $(".comment").val('')
          event.preventDefault(); // avoid to execute the actual submit of the form.
          // });

          } else {

          alert( "Handler for .submit() called." );
          event.preventDefault();
          }

        }


       })