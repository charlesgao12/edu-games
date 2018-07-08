
function coordinate(e){


	x=e.clientX-8;
	y=e.clientY-8;
	document.getElementById("xycoordinates").innerHTML="Coordinates: (" + x + "," + y + ")";

}

$(document).ready(function(){
	$("#PigWinText").hide();
	$("#PigLoseText").hide();
	$("#BirdWinText").hide();
	$("#BirdLoseText").hide();

	var cities = {
		'harbin':[434,40],
		'shenyang':[416,128],
		'beijing':[304,178],
		'shijiazhuang': [276,226],
		'taiyuan': [244,230],
		'tianjin':[324,198],
		'qinhuangdao':[356,181],
		'qingdao':[377,246],
		'dalian':[396,193],
		'jinan':[321,262],
		'xuzhou':[341,298],
		'zhengzhou':[268,296],
		'xian':[168,314],
		'baoji':[142,308],
		'lanzhou':[82,280],
		'xining':[34,261],
		'jiangyou':[100,358],
		'wuhan':[286,382],
		'chongqing':[146,398],
		'chengdu':[76,372],
		'dazhou':[165,365],
		'hefei':[341,358],
		'nanjing':[374,332],
		'shanghai':[426,346],
		'hangzhou':[406,381],
		'changsha':[268,424],
		'guiyang':[109,457],
		'kunming':[24,505],
		'guangzhou':[256,532],
		'fuzhou':[389,449],
		'shenzhen':[293,542]
	};

	function moveTrain(city){
		ctx.drawImage(train,cities[city][0]-15,cities[city][1]-15,30,30)
	}
	


		//alert('h')
		var canvas=document.getElementById("canvas");
		var ctx=canvas.getContext("2d");
		var map = document.getElementById("map")
		var train = document.getElementById("train")
		ctx.drawImage(map,0,0);
		//moveTrain('xining')
		
		

	


	
	//alert(points.length)

	

	function getPoints(){
		var points = new Array();
		points.push({x:canvas.width/2,y:canvas.height/2});//start
		line = 80;
		x=canvas.width/2;
		y=canvas.height/2-80;
		points.push({x:x,y:y});
		for(i=1;i<size-1;i++){
			x=x-line*Math.sin(i*360*Math.PI/180/size);
			y=y-line*Math.cos(i*360*Math.PI/180/size);
			points.push({x:x,y:y});			
		}
		points.push({x:canvas.width/2,y:canvas.height/2});//end, to push the start point again
		//alert(points.length);
		return points;

	}

	//reset();
	
	//draw(actionList)



	function draw(actions){
		actionList = actions;
		dotList=[{x:pencilPosition.x,y:pencilPosition.y}];
		setTimeout(animation,500);

	}

	function matching(pointA, pointB){
		var res = (Math.abs(pointA.x-pointB.x) < 1) && (Math.abs(pointA.y-pointB.y) < 1);
		return res;
	}


	function animation(){
		if(actionList.length >0){
			action = actionList[0];
			actionList.splice(0,1);
			window.requestAnimationFrame(function(){
				pencilMove(action,animation)	
			});
			

		}else{//this is also the callback function, so can check the result here
			var isCorrect = true;
			while(points.length>1){//at least 2 points
				lastPoint = points.pop();
				previous = points[points.length-1];
				console.log("checking:"+previous.x+"-"+previous.y+"  "+lastPoint.x+"-"+lastPoint.y);
				var findMatching = false;
				for (var i = 0; i < dotList.length-1; i++) {
					if(
						(matching(lastPoint,dotList[i]) && matching(previous,dotList[i+1]))||
						(matching(lastPoint,dotList[i+1]) && matching(previous,dotList[i]))
						)
					{//can find a matching line
						findMatching =true;
						break;
					}					
				}
				console.log("matching:"+findMatching);
				if(!findMatching){
					isCorrect = false;
					break;
				}

			}

			$("#BirdWinText").hide();
			$("#BirdLoseText").hide();

			if(isCorrect){
				$("#BirdWinText").show();
				
			}else{

				$("#BirdLoseText").show();

			}
			

		}

		
	}
	
	


	
	


	//$("#blocklyDiv").offset({top:0,left:550})
	//$("#codes").offset({top:500,left:8});
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
	Blockly.Blocks['turnPen']={
		init: function(){
			this.jsonInit(turnPen);  		
		}
	};
	Blockly.FieldAngle.CLOCKWISE=true;
	Blockly.FieldAngle.OFFSET=90;

	Blockly.Blocks['movePencil']={
		init: function(){
			this.jsonInit(movePencil);  		
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
		
		
		ctx.drawImage(pencil, x,y,40,40);
		//ctx.moveTo(x,y);
		//ctx.beginPath();
	}

	function setStrokeStyle(style){
		strokeStyle = style;
	}

	function drawLine(){
		actionList.push({angle:pencilAngle,steps:80,style:strokeStyle});
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

	


	function pencilMove(action,callback){
		console.log("clear");
		ctx.clearRect(0,0,canvas.width,canvas.height);
		initBox();
		ctx.beginPath();
		//alert(angle+":"+steps);
		pencilAngle = action.angle;
		x = action.steps*Math.sin(pencilAngle*Math.PI/180)
		y = action.steps*Math.cos(pencilAngle*Math.PI/180)
		
		dotList.push({x:pencilPosition.x+x,y:pencilPosition.y-y});

		//ctx.beginPath()

		var start = dotList[0];

		ctx.moveTo(start.x,start.y);
		console.log("move to:"+start.x+" "+start.y);

		for (var i = 1; i < dotList.length; i++) {
			console.log("line to:"+dotList[i].x+" "+dotList[i].y);
			ctx.lineTo(dotList[i].x,dotList[i].y);
		}

		
		ctx.strokeStyle=action.style;
		ctx.lineWidth=3;
		console.log("stroke");
		ctx.stroke();
		
		
		pencilMoveTo(pencilPosition.x+x,pencilPosition.y-y)

		//alert(action.style);
		



		

		
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
		setStrokeStyle("#000000");
		pencilAngle = 0;
		
		ctx.moveTo(200,200);


		ctx.beginPath();
		
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

	

	



	function initBox(){
		ctx.beginPath();
		ctx.moveTo(points[0].x,points[0].y);
		for (var i = 1; i < points.length; i++) {
			ctx.lineTo(points[i].x,points[i].y);
		}
		
		ctx.strokeStyle="red";
		ctx.lineWidth=1;
		ctx.stroke();
		

		




	}

	function reset(){
		$("#PigWinText").hide();
		$("#PigLoseText").hide();
		$("#BirdWinText").hide();
		$("#BirdLoseText").hide();

		ctx.clearRect(0,0,canvas.width,canvas.height);
			
		pencilAngle = 0;
		pencilPosition ={x:0,y:0};
		actionList = new Array();
		strokeStyle = '#000000';
		moveTo(0,0);
		points=getPoints();
		initBox();
		  	
		  	

		  	

	}

	


	

  

});

