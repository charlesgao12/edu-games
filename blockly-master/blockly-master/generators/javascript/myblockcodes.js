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

