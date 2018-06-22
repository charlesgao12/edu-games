var pages = ["Simple.htm","axis.htm","angle.htm"];
var playing =0;
$(document).ready(
	function(){
		$().maps();
		
	}
);

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