Blockly.JavaScript['Right']=function(block){
	return 'right();';
};
Blockly.JavaScript['Left']=function(block){
	return 'left();';
};
Blockly.JavaScript['Up']=function(block){
	return 'up();';
};
Blockly.JavaScript['Down']=function(block){
	return 'down();';
};
Blockly.JavaScript['pigCoordinate']=function(block){
	var x = block.getFieldValue('X');
	var y = block.getFieldValue('Y');
	return "setPigCor("+x+","+y+");";
};
Blockly.JavaScript['birdCoordinate']=function(block){
	var x = block.getFieldValue('X');
	var y = block.getFieldValue('Y');
	return "setBirdCor("+x+","+y+");";
};

Blockly.JavaScript['turn']=function(block){
	var lw = block.getFieldValue('lw');
	var angle = block.getFieldValue('angle');
	return "turnBirdAndCheck(\""+lw+"\","+angle+");";
};

Blockly.JavaScript['faceDirection']=function(block){
	var angle = block.getFieldValue('angle');
	return "face("+angle+");";
};
Blockly.JavaScript['movePencil']=function(block){
	
	return "drawLine();";
};
Blockly.JavaScript['turnPen']=function(block){
	var lw = block.getFieldValue('lw');
	var angle = block.getFieldValue('angle');
	return "turnPencil(\""+lw+"\","+angle+");";
};

Blockly.JavaScript['moveTot']=function(block){
	var x = block.getFieldValue('x');
	var y = block.getFieldValue('y');
	return "moveTo("+x+","+y+");";
};




