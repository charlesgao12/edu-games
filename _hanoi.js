$(document).ready(function(){
	$("#PigWinText").hide();
	$("#PigLoseText").hide();
	$("#BirdWinText").hide();
	$("#BirdLoseText").hide();

	var childdiv=$('<div class=\'Brick\'></div>'); 
	childdiv.css('width','100px');
    $('#A').append(childdiv);

    var d2=$('<div class=\'Brick\'></div>'); 
	d2.css('width','50px');
	d2.css('background','#333333');
	d2.css('top','20px');
    $('#A').append(d2);
	


	

  

});

