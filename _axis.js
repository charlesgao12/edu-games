$(document).ready(function(){
	var size = 30;
	writeBox();
	reset();


	//$("#blocklyDiv").offset({top:0,left:550})
	//$("#codes").offset({top:500,left:8});

	Blockly.Blocks['pigCoordinate']={
		init: function(){
			this.jsonInit(pigCoordinate);  		
		}
	};
	Blockly.Blocks['birdCoordinate']={
		init: function(){
			this.jsonInit(birdCoordinate);  		
		}
	};
	

	var workspace =Blockly.inject('blocklyDiv',{toolbox:document.getElementById('toolbox')});
	var initCode = "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"pigCoordinate\" id=\"0d*Rl~?nq`@?F9N;`]q)\" x=\"22\" y=\"26\"><field name=\"X\">-1</field><field name=\"Y\">-1</field></block><block type=\"birdCoordinate\" id=\"3VM=57[@eiZ~48y#|_[R\" x=\"21\" y=\"121\"><field name=\"X\">-1</field><field name=\"Y\">-1</field></block></xml>";
	var xml = Blockly.Xml.textToDom(initCode);
	Blockly.Xml.domToWorkspace(xml, workspace);
	//end of startting


	//$("button#move").offset({top:450,left:30});
	$("button#move").click(function(){
		//Blockly.JavaScript.addReservedWords('code');
		var code = Blockly.JavaScript.workspaceToCode(workspace);
		$("#codes").text("");
		$("#PigWinText").hide();
		$("#PigLoseText").hide();
		$("#BirdWinText").hide();
		$("#BirdLoseText").hide();

		eval(code);
		//var xml = Blockly.Xml.workspaceToDom(workspace);
		//var xml_text = Blockly.Xml.domToText(xml);
		//$("#codes").text(xml_text);


		
		

		


	});

	//$("button#reset").offset({top:450,left:100});
	$("button#reset").click(function(){
		reset();
	});

	function birdAnimation1(){
		$("#pointer").animate({width:"60px"},1000);
		$("#pointer").width(0);	
	}

	function reset(){
		  	resetPosition($("#pig"));
		  	birdp=resetPosition($("#bird"));
		  	//$("#pointer").offset({top:8+30+(6-birdp.y)*size,left:12+8+30+(birdp.x+8)*size});
		  	$("#PigWinText").hide();
		  	$("#PigLoseText").hide();
		  	$("#BirdWinText").hide();
		  	$("#BirdLoseText").hide();
		  	
		  	//birdAnimation1();
		  	
		  	

		  	

	}

	function setPigCor(x,y){
		if(x == $("#pig").attr("x") && y == $("#pig").attr("y") ){
			$("#PigWinText").show();
		}else{	
			$("#PigLoseText").show();
			
		}

	}
	function setBirdCor(x,y){
		if(x == $("#bird").attr("x") && y == $("#bird").attr("y") ){
			$("#BirdWinText").show();
			
		}else{
			$("#BirdLoseText").show();
			
		}

	}










	function move(animal, x, y){
		animal.offset({top:8+15+(6-y)*size,left:8+15+(x+8)*size});
		animal.attr("x",x);
		animal.attr("y",y);
	}


	function resetPosition(animal){
		var x = Math.floor(Math.random()*17)-8;
		var y = Math.floor(Math.random()*13)-6;
		move(animal,x,y);

		return {'x':x,'y':y};
	}


	function writeBox(){
		var canvas = document.getElementById("canvas");
		var ctx =canvas.getContext("2d");
		
		
		for (var i = 0; i <= 16; i++) {
			ctx.moveTo(i*size+size,size);//left,top
			ctx.lineTo(i*size+size,size*13);
			//ctx.stroke();
		}
		for (var i = 0; i <= 12; i++) {
			ctx.moveTo(size,i*size+size);
			ctx.lineTo(size*17,i*size+size);
			
		}
		ctx.strokeStyle="#111111"
		ctx.lineWidth=0.5
		ctx.stroke();
		ctx.beginPath();

		ctx.moveTo(8*size+size,size);
		ctx.lineTo(8*size+size,size*13);
		ctx.moveTo(size,7*size);
		ctx.lineTo(size*17,7*size);
		ctx.strokeStyle="blue"
		ctx.lineWidth=1
		ctx.stroke();

		ctx.beginPath();
		ctx.font="12px Arial";
		ctx.fillStyle="red";
		for (var i = -8; i <=8 ; i++) {
			ctx.fillText(""+i,(i+9)*size+2,7*size+12);		
		}
		for (var i = -6; i <=6 ; i++) {
			ctx.fillText(""+(0-i),9*size+2,(i+7)*size+12);		
		}

		
		
	}

  

});

