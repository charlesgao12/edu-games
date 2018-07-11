
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
	var trainPosition ={x:0,y:0};
	

	var movingList =[]//to store the city list of the path input from blockly
	
	var dotList=new Array();// to store the already moved path in the draw flow

	var result = undefined

	function move(from, through,to){
		movingList =[]
		result = undefined

		movingList.push(from.toLowerCase())
		var thrus = through.split("|")
		for (var i in thrus) {
			if(thrus[i].trim() != ""){
				movingList.push(thrus[i].trim().toLowerCase());
			}
		}
		movingList.push(to.toLowerCase());
		$.ajax({
			type:"POST",
			url: "http://localhost:9999/DeepFirst",
			data: JSON.stringify(movingList),
			contentType:"application/json; charset=utf-8",
			dataType:"json",
			success: function(data){
				console.log(data.res)
				result = data;
				draw();
			},
			failure: function(err){
				alert(err)
			}
		});
		// $.get("http://localhost:9999/DeepFirst",{path:},function(data,status){
		// 	if(status == 'success'){
		// 		var j = JSON.parse(data)
		// 		alert(j[0])
		// 	}
		//  });


		console.log('move:'+movingList)
	}

	function getCityCoor(city){
		var xx = cities[city][0];
		var yy = cities[city][1];
		return {x:xx,y:yy}
	}

	function draw(){
		// actionList = actions;		
		dotList=[getCityCoor(popleft(movingList))];//pop the first city and store to dotList as starting point
		console.log('draw:'+dotList)
		trainPosition = {x:dotList[0].x,y:dotList[0].y}//be careful cannot direct use 'trainPosition = dotList[0]' as it will pass the dotList[0] address to trainPosition, then once trainPosition changed, dotList also changed unexpectedly
		setTimeout(animation,500);//delay to start animation

	}

	function popleft(list){// remove and return the first element in list
		var res=undefined;
		if(movingList.length >0){
			res = list[0]
			list.splice(0,1)


		}
		return res
	}

	//the animation function to draw on canvas, also work as callback
	function animation(){
		if(movingList.length >0){
			city =popleft(movingList);
			if(!result.res && result.wrongCity == city){
				$("#BirdLoseText").show();

			}
			else{
				action = getCityCoor(city)
				window.requestAnimationFrame(function(){
					trainMove(action,animation)	
				});
			}
			
			

		}else {//this is also the callback function, so can check the result here
			if(result.res){
				
				$("#BirdWinText").show();
				

			}
			// var isCorrect = true;
			// while(points.length>1){//at least 2 points
			// 	lastPoint = points.pop();
			// 	previous = points[points.length-1];
			// 	console.log("checking:"+previous.x+"-"+previous.y+"  "+lastPoint.x+"-"+lastPoint.y);
			// 	var findMatching = false;
			// 	for (var i = 0; i < dotList.length-1; i++) {
			// 		if(
			// 			(matching(lastPoint,dotList[i]) && matching(previous,dotList[i+1]))||
			// 			(matching(lastPoint,dotList[i+1]) && matching(previous,dotList[i]))
			// 			)
			// 		{//can find a matching line
			// 			findMatching =true;
			// 			break;
			// 		}					
			// 	}
			// 	console.log("matching:"+findMatching);
			// 	if(!findMatching){
			// 		isCorrect = false;
			// 		break;
			// 	}

			// }

			// $("#BirdWinText").hide();
			// $("#BirdLoseText").hide();

			// if(isCorrect){
			// 	$("#BirdWinText").show();
				
			// }else{

			// 	$("#BirdLoseText").show();

			// }
			

		}

		
	}

	function trainMove(action,callback){
		console.log("clear");
		ctx.clearRect(0,0,canvas.width,canvas.height);
		initBox();
		ctx.beginPath();
		
		
		dotList.push({x:action.x,y:action.y});//todo

		//ctx.beginPath()

		var start = dotList[0];

		ctx.moveTo(start.x,start.y);
		console.log("move to:"+start.x+" "+start.y);

		for (var i = 1; i < dotList.length; i++) {
			console.log("line to:"+dotList[i].x+" "+dotList[i].y);
			ctx.lineTo(dotList[i].x,dotList[i].y);
		}

		
		ctx.strokeStyle='purple';
		ctx.lineWidth=6;
		console.log("stroke");
		ctx.stroke();
		
		
		trainMoveTo(action.x,action.y)

		//alert(action.style);	

		
		// window.requestAnimationFrame(callback);		
		setTimeout(callback,500);

	}

	function trainMoveTo(x,y){//if x,y = 0,0, position.x ,y = 240,180
		// trainPosition.x=x;
		// trainPosition.y=y;		
		trainPosition.x=x;
		trainPosition.y=y;
		
		ctx.drawImage(train1,dotList[0].x-15,dotList[0].y-15,30,30)
		
		ctx.drawImage(train, x-15,y-15,30,30);
		//ctx.moveTo(x,y);
		//ctx.beginPath();
	}

	function moveTrain(city){
		ctx.drawImage(train,cities[city][0]-15,cities[city][1]-15,30,30)
	}

	function trainTo(city){

	}


	Blockly.Blocks['mapp']={
		init: function(){
			this.jsonInit(mapp);  		
		}
	};
	Blockly.Blocks['city']={
		init: function(){
			this.jsonInit(city);  		
		}
	};
	
	

	var workspace =Blockly.inject('blocklyDiv',{toolbox:document.getElementById('toolbox')});
	


		//alert('h')
		var canvas=document.getElementById("canvas");
		var ctx=canvas.getContext("2d");
		var map = document.getElementById("map")
		var train = document.getElementById("train")
		
		//moveTrain('xining')
		
		initBox()
		

	


	
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



	

	function matching(pointA, pointB){
		var res = (Math.abs(pointA.x-pointB.x) < 1) && (Math.abs(pointA.y-pointB.y) < 1);
		return res;
	}


	
	


	
	


	
	

	function moveTo(x,y){//this function is to be called by blockly, as the blockly coordiates are different from canvas'
		x = x+ canvas.width/2;
		y = y+ canvas.height/2;
		pencilMoveTo(x,y);
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

	


	

	

	
	var initCode = "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"mapp\" id=\"#NnX$U2J1|cTX)vdm=^*\" x=\"76\" y=\"116\"><field name=\"from\">Harbin</field><field name=\"to\">Dalian</field><statement name=\"through\"><block type=\"city\" id=\"iMyP#7`U_[!-nExu8r-t\"><field name=\"city\">Shenyang</field></block></statement></block></xml>";
	var xml = Blockly.Xml.textToDom(initCode);
	Blockly.Xml.domToWorkspace(xml, workspace);
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
		//actionList=new Array();
		eval(code);
		




		
		

		


	});

	//$("button#reset").offset({top:450,left:100});
	$("button#reset").click(function(){
		// reset();
		var xml = Blockly.Xml.workspaceToDom(workspace);
		var xml_text = Blockly.Xml.domToText(xml);
		$("#codes").text(xml_text);
	});

	

	



	function initBox(){
		ctx.drawImage(map,0,0);
		
		// ctx.beginPath();
		// ctx.moveTo(points[0].x,points[0].y);
		// for (var i = 1; i < points.length; i++) {
		// 	ctx.lineTo(points[i].x,points[i].y);
		// }
		
		// ctx.strokeStyle="red";
		// ctx.lineWidth=1;
		// ctx.stroke();
		

		




	}

	function reset(){
		$("#PigWinText").hide();
		$("#PigLoseText").hide();
		$("#BirdWinText").hide();
		$("#BirdLoseText").hide();

		ctx.clearRect(0,0,canvas.width,canvas.height);
			
		pencilAngle = 0;
		trainPosition ={x:0,y:0};
		actionList = new Array();
		strokeStyle = '#000000';
		moveTo(0,0);
		points=getPoints();
		initBox();
		  	
		  	

		  	

	}

	


	

  

});

