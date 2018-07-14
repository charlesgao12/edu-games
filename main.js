var pages = ["Simple.htm","axis.htm","angle.htm","canvas_test3.htm","canvas_test4.htm","canvas_test6.htm","map1.htm","map2.htm","map3.htm","map4.htm"];
var playing =0;
$(document).ready(
	function(){
		$().maps();
		
	}
);

function canvas(){
	$("#playground").attr('src',"canvas.htm");
}

function play(index){
	playing =index;
	$("#playground").attr('src',pages[index]);	
	
}

function next(){
	++playing;
	if(playing >= pages.length){
		playing =0
	}
	play(playing);
}
function previous(){
	--playing;
	if(playing < 0){
		playing = pages.length-1
	}
	play(playing);
}