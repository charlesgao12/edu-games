$(document).ready(function(){

	var finish={x:5,y:5};
  
  boxes();

	reset();


  

  $("#blocklyDiv").offset({top:0,left:450})
  $("#codes").offset({top:558,left:8});
  Blockly.Blocks['Right']={
  	init: function(){
  		this.jsonInit(rightjson);  		
  	}
  };
  Blockly.Blocks['Left']={
  	init: function(){
  		this.jsonInit(leftjson);  		
  	}
  };
  Blockly.Blocks['Up']={
  	init: function(){
  		this.jsonInit(upjson);  		
  	}
  };
  Blockly.Blocks['Down']={
  	init: function(){
  		this.jsonInit(downjson);  		
  	}
  };

  var workspace =Blockly.inject('blocklyDiv',{toolbox:document.getElementById('toolbox')});
  $("button#move").offset({top:430,left:350});
  $("button#move").click(function(){
  	//Blockly.JavaScript.addReservedWords('code');
  	var code = Blockly.JavaScript.workspaceToCode(workspace);
  	$("#codes").text(code);

  	eval(code);
  	

  	


  });

  $("button#reset").offset({top:430,left:250});
  $("button#reset").click(function(){
  	reset();
  });

  function reset(){
  	  	$("#ball").offset({top:8,left:8});
  	  	finish.x = Math.floor(Math.random()*9)+1;
  	  	finish.y = Math.floor(Math.random()*9)+1;
  	  	$("#Finish").offset({top:finish.x*40+8,left:finish.y*40+8});
  	  	$("#WinText").hide();
  		$("#LoseText").hide();

  }

  	
  
  
  

});

var isFinished = false;

function checkFinish(){
	if(actionsCount<=0){
		if($("#ball").offset().top == $("#Finish").offset().top && $("#ball").offset().left == $("#Finish").offset().left){
			$("#codes").text("win");
			$("#WinText").show();
		}else{
			$("#codes").text("lose");
			$("#LoseText").show();
		}
	}


	
	
}

var actions = new Array();
var actionsCount = 0;

var actionCallback = function(){
	--actionsCount;
	checkFinish();
};

function right(){


	//var position=$("#ball").offset();
	//$("#ball").offset({top:position.top,left:position.left+40})
	++actionsCount;
	$("#ball").animate(
	{
		left:'+=40px'
	},
	"slow",
	actionCallback


	);
	

}
function left(){
	++actionsCount;
	$("#ball").animate(
	{
		left:'-=40px'
	},
	"slow",
	actionCallback


	);

}
function up(){
	++actionsCount;
	$("#ball").animate(
	{
		top:'-=40px'
	},
	"slow",
	actionCallback

	);

}
function down(){
	++actionsCount;
	$("#ball").animate(
	{
		top:'+=40px'
	},
	"slow",
	actionCallback

	);

}

function boxes(){
	  for (var i = 0; i < 10; i++) {
	  	for (var j = 0; j < 10; j++) {
	 		if((i+j)%2==0){
	 			var greyBox = $("<div id='GreyBox"+i+j+"'></div>");
				greyBox.addClass("GreyBox");
				greyBox.offset({top:i*40,left:j*40});
				$("div#PlayGround").append(greyBox);


	 		}else{
	 			var whiteBox = $("<div id='WhiteBox"+i+j+"'></div>");
				whiteBox.addClass("WhiteBox");
	 			whiteBox.offset({top:i*40,left:j*40});
	 			$("div#PlayGround").append(whiteBox);

	 		}
	  	}
	  }

}

function writeBox(){
	var canvas = document.getElementById("canv");
	var ctx =canvas.getContext("2d");
	canvas.style.width
	ctx.moveTo(0,0);
	ctx.lineTo(180,80);
	ctx.stroke();

	ctx.moveTo(50,50);
}