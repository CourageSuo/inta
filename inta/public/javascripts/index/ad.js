var img2 = document.getElementsByClassName('image2')[0]
var img3 = document.getElementsByClassName('image3')[0]
var parent = document.getElementsByClassName('parent')[0]

    var i = 1

img3.onclick = function(){

    var ida = setInterval(function(){

	img2.style.top = img2.offsetTop - 1*i++ + 'px'
	img3.style.top = img3.offsetTop - 1*i++ + 'px'
 	
    },20)
}

window.onscroll = function(){
	
	img2.style.top = img2.offsetTop - document.documentElement.scrollTop + 'px'
	img3.style.top = img3.offsetTop - document.documentElement.scrollTop + 'px'
}