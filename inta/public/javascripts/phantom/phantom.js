function moveCrossScreen(classSelector) {

var imgWidth = $(document).width() - $(classSelector).width()
var imgHeight = $(document).height() - $(classSelector).height()

	var flagWidth = 4;
	var flagHeight = 4;

setInterval(function(){ 
	if($(classSelector).offset().left > imgWidth || $(classSelector).offset().left < 0 ) {
		flagWidth *= -1	
	}
	if($(classSelector).offset().top > imgHeight || $(classSelector).offset().top < 0) {
		flagHeight *= -1
	}
	$(classSelector).css('left','+=' + flagWidth)
	$(classSelector).css('top','+=' + flagHeight)

},35)

}

function setPosition(classSelector,area) {
	var imgWidth = $(document).width() - $(classSelector).width()
    var imgHeight = $(document).height() - $(classSelector).height()
	$(classSelector).css('left',imgWidth * 0.3 * Math.random() + imgWidth * area)
	$(classSelector).css('top',imgHeight * 0.3 * Math.random() + imgHeight * area)
}

setPosition('.p1',0.1)
setPosition('.p2',0.4)
setPosition('.p3',0.7)

moveCrossScreen('.p1')
moveCrossScreen('.p2')
moveCrossScreen('.p3')




