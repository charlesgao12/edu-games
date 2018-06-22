$(document).ready(function(){
	var long =$("#canvas").width()/2
	var size = 30;
	
	var canvas = document.getElementById("canvas");
	var ctx =canvas.getContext("2d");
	var birdAng=0
	var pigAng =0
	
	reset();


	//$("#blocklyDiv").offset({top:0,left:550})
	//$("#codes").offset({top:500,left:8});

	Blockly.Blocks['turn']={
		init: function(){
			this.jsonInit(turn);  		
		}
	};

	

	var workspace =Blockly.inject('blocklyDiv',{toolbox:document.getElementById('toolbox')});
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
		eval(code);


		
		

		


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

			pigAng = Math.floor(Math.random()*24)*15; //0-24
			var angle = Math.floor(Math.random()*24)*15;


			
			//alert(i+""+angle+":"+Math.sin(angle)+":"+Math.cos(angle));
			var x =  Math.sin(pigAng*Math.PI/180) * long*0.5;
			var y = Math.cos(pigAng*Math.PI/180) * long*0.5;

			var pigXO = 198;
			var pigYO = 195;

		  	$("#pig").offset({top:pigYO-y,left:pigXO+x});
		  	//$("#canvas").offset({top:100,left:100});

		  	//ctx.save();

		  	//ctx.translate(200,200);
		  	//ctx.rotate(birdAng*Math.PI/180);
		  	//image=document.getElementById("bird")
		  	//ctx.drawImage(image,-10,-11,80,19)
		  	turnBird("r",angle);



		  	// rotate = 90//Math.floor(Math.random()*24)*15;


		  	// $("#bird").css({"transform":"rotate("+rotate+"deg)"});
		  	// $("#bird").css({"-ms-transform":"rotate("+rotate+"deg)"});
		  	// $("#bird").css({"-moz-transform":"rotate("+rotate+"deg)"});
		  	// $("#bird").css({"-o-transform":"rotate("+rotate+"deg)"});

		  	// $("#bird").offset({top:165, left:169});
	


		  

		  	//birdp=move($("#bird"),0,0);

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
		// var canvas = document.getElementById("canvas");
		// var ctx =canvas.getContext("2d");
		
		
		//alert($("#canvas").width()+","+$("#canvas").height());
		ctx.beginPath()
			
			ctx.moveTo(long ,long);
			for (var i = 0; i < 24; i++) {
				var angle = i*15*Math.PI/180;
				//alert(i+""+angle+":"+Math.sin(angle)+":"+Math.cos(angle));
				var x =  Math.sin(angle) * long;
				var y = Math.cos(angle) * long;
				ctx.moveTo(long,long);//left,top
				ctx.lineTo(long+x,long-y);
				ctx.fillText(""+i*15,long+0.9*x,long-y*0.9)

			}
			
			//ctx.moveTo(0,0);
			//ctx.lineTo(400,400);
			ctx.lineWidth=0.3
			ctx.stroke();
		//ctx.stroke();

		// ctx.strokeStyle="#111111"
		// ctx.lineWidth=0.5
		
		// ctx.beginPath();

		// ctx.moveTo(8*size+size,size);
		// ctx.lineTo(8*size+size,size*13);
		// ctx.moveTo(size,7*size);
		// ctx.lineTo(size*17,7*size);
		// ctx.strokeStyle="blue"
		// ctx.lineWidth=1
		// ctx.stroke();

		// ctx.beginPath();
		// ctx.font="12px Arial";
		// ctx.fillStyle="red";
		// for (var i = -8; i <=8 ; i++) {
		// 	ctx.fillText(""+i,(i+9)*size+2,7*size+12);		
		// }
		// for (var i = -6; i <=6 ; i++) {
		// 	ctx.fillText(""+(0-i),9*size+2,(i+7)*size+12);		
		// }

		
		
	}

  

});

