$(document).ready(function(){
	$("#PigWinText").hide();
	$("#PigLoseText").hide();
	$("#BirdWinText").hide();
	$("#BirdLoseText").hide();
	
	var canvas = document.getElementById("canvas");
	var ctx =canvas.getContext("2d");	
	var pencil = document.getElementById("pencil")
	var pencilAngle = 0;
	var pencilPosition ={x:0,y:0};
	var actionList = new Array();
	moveTo(0,0);
	
	//draw(actionList)

	function draw(actions){
		actionList = actions;
		setTimeout(animation,500);

	}


	function animation(){
		if(actionList.length >0){
			action = actionList[0];
			actionList.splice(0,1);
			pencilMove(action.angle,action.steps,animation)

		}
		
	}
	
	


	
	


	//$("#blocklyDiv").offset({top:0,left:550})
	//$("#codes").offset({top:500,left:8});

	Blockly.Blocks['turnPen']={
		init: function(){
			this.jsonInit(turnPen);  		
		}
	};
	Blockly.FieldAngle.CLOCKWISE=true;
	Blockly.FieldAngle.OFFSET=90;
	Blockly.Blocks['faceDirection']={
		init: function(){

			this.jsonInit(faceDirection);  	
			// this.setOnChange(function(changeEvent) {
			//       if (this.getInput('NUM').connection.targetBlock()) {
			//         this.setWarningText(null);
			//       } else {
			//         this.setWarningText('Must have an input block.');
			//       }
			//     });


		}

	};
	Blockly.Blocks['movePencil']={
		init: function(){
			this.jsonInit(movePencil);  		
		}
	};
	Blockly.Blocks['moveTot']={
		init: function(){
			this.jsonInit(moveTot);  		
		}
	};
	

	var workspace =Blockly.inject('blocklyDiv',{toolbox:document.getElementById('toolbox')});

	function moveTo(x,y){//this function is to be called by blockly, as the blockly coordiates are different from canvas'
		x = x+ canvas.width/2;
		y = y+ canvas.height/2;
		pencilMoveTo(x,y);
	}


	function pencilMoveTo(x,y){//if x,y = 0,0, position.x ,y = 240,180
		// pencilPosition.x=x;
		// pencilPosition.y=y;		
		pencilPosition.x=x;
		pencilPosition.y=y;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.drawImage(pencil, x,y,40,40);
		ctx.moveTo(x,y);
		//ctx.beginPath();
	}

	function drawLine(){
		actionList.push({angle:pencilAngle,steps:40});
	}

	function turnPencil(lw,angle){
		if(lw=="l"){
			pencilAngle -= angle;

		}else{
			pencilAngle+=angle;

		}
	}

	function face(angle){
		pencilAngle = angle;
	}
	function pencilMove(angle,steps,callback){
		//alert(angle+":"+steps);
		pencilAngle = angle;
		x = steps*Math.sin(pencilAngle*Math.PI/180)
		y = steps*Math.cos(pencilAngle*Math.PI/180)

		//ctx.beginPath()

		ctx.moveTo(pencilPosition.x,pencilPosition.y);

		ctx.lineTo(pencilPosition.x+x,pencilPosition.y-y);
		pencilMoveTo(pencilPosition.x+x,pencilPosition.y-y)
		ctx.stroke();
		// window.requestAnimationFrame(callback);		
		setTimeout(callback,500);

	}

	

	
	// var initCode = "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"pigCoordinate\" id=\"0d*Rl~?nq`@?F9N;`]q)\" x=\"22\" y=\"26\"><field name=\"X\">-1</field><field name=\"Y\">-1</field></block><block type=\"birdCoordinate\" id=\"3VM=57[@eiZ~48y#|_[R\" x=\"21\" y=\"121\"><field name=\"X\">-1</field><field name=\"Y\">-1</field></block></xml>";
	// var xml = Blockly.Xml.textToDom(initCode);
	// Blockly.Xml.domToWorkspace(xml, workspace);
	//end of startting


	//$("button#move").offset({top:450,left:30});
	$("button#move").click(function(){
		//Blockly.JavaScript.addReservedWords('code');
		var code = Blockly.JavaScript.workspaceToCode(workspace);
		//$("#codes").text("");
		$("#PigWinText").hide();
		$("#PigLoseText").hide();
		$("#BirdWinText").hide();
		$("#BirdLoseText").hide();

		$("#codes").text(code);
		//var xml = Blockly.Xml.workspaceToDom(workspace);
		//var xml_text = Blockly.Xml.domToText(xml);
		//$("#codes").text(xml_text);
		actionList=new Array();
		eval(code);
		draw(actionList);



		
		

		


	});

	//$("button#reset").offset({top:450,left:100});
	$("button#reset").click(function(){
		reset();
	});

	function birdAnimation1(){
		$("#pointer").animate({width:"60px"},1000);
		$("#pointer").width(0);	
	}

	function turnBird(lw,angle){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.save();
		writeBox();
		if(lw == "l"){
			birdAng -= angle;
		}else{
			birdAng += angle;
		}

		

		
		
		ctx.translate(200,200);
		ctx.rotate(birdAng*Math.PI/180);
		image=document.getElementById("bird")
		ctx.drawImage(image,-10,-11,80,19)
		ctx.restore();



		//

	}

	function turnBirdAndCheck(lw,angle){
		turnBird(lw,angle);
		$("#PigWinText").hide();
		$("#PigLoseText").hide();
		$("#BirdWinText").hide();
		$("#BirdLoseText").hide();
		if((birdAng+90)%360 == pigAng%360){
			$("#BirdWinText").show();
		}else{
			$("#BirdLoseText").show();
		}


		
		



	}



	function reset(){
		pencilAngle = 0;
		pencilPosition ={x:0,y:0};
		actionList = new Array();
		ctx.beginPath();
		moveTo(0,0);
		



			
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


	

  

});

