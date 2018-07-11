var rightjson = {
	"type":"Right",
	"message0":"%1",
	"args0":[
		{
			"type":"field_image",
			"src":"right.png",
			"width":40,
			"height":30,
			"alt":"*"
		}

	],
	"colour":160,
	"nextStatement":null,
  	"previousStatement":null

};
var leftjson = {
	"type":"Left",
	"message0":"%1",
	"args0":[
		{
			"type":"field_image",
			"src":"left.png",
			"width":40,
			"height":30,
			"alt":"*"
		}

	],
	"colour":160,
	"nextStatement":null,
  	"previousStatement":null

};
var upjson = {
	"type":"Up",
	"message0":"%1",
	"args0":[
		{
			"type":"field_image",
			"src":"up.png",
			"width":30,
			"height":40,
			"alt":"*"
		}

	],
	"colour":160,
	"nextStatement":null,
  	"previousStatement":null

};
var downjson = {
	"type":"Down",
	"message0":"%1",
	"args0":[
		{
			"type":"field_image",
			"src":"down.png",
			"width":30,
			"height":40,
			"alt":"*"
		}

	],
	"colour":160,
	"nextStatement":null,
  	"previousStatement":null

};

var pigCoordinate = {
  "type": "pigCoordinate",
  
  "message0": "Pig's coordinates: ",
  "message1":"x : %1",  
  "args1": [
    {
      "type": "field_dropdown",
      "name": "X",
      "options": [
        [ "-1", "-1" ],
        [ "-2", "-2" ],
        [ "-3", "-3" ],
        [ "-4", "-4" ],
        [ "-5", "-5" ],
        [ "-6", "-6" ],
        [ "-7", "-7" ],
        [ "-8", "-8" ],
        [ "0", "0" ],
        [ "1", "1" ],
        [ "2", "2" ],
        [ "3", "3" ],
        [ "4", "4" ],
        [ "5", "5" ],
        [ "6", "6" ],
        [ "7", "7" ],
        [ "8", "8" ]
      ]
    }
  ],
  "message2":"y : %1",  
  "args2": [
    {
      "type": "field_dropdown",
      "name": "Y",
      "options": [
        [ "-1", "-1" ],
        [ "-2", "-2" ],
        [ "-3", "-3" ],
        [ "-4", "-4" ],
        [ "-5", "-5" ],
        [ "-6", "-6" ],  
        [ "0", "0" ],
        [ "1", "1" ],
        [ "2", "2" ],
        [ "3", "3" ],
        [ "4", "4" ],
        [ "5", "5" ],
        [ "6", "6" ]
      ]
    }
  ],

  "colour":120  

};

var birdCoordinate = {
  "type": "birdCoordinate",
  
  "message0": "Bird's coordinates: ",
  "message1":"x : %1",  
  "args1": [
    {
      "type": "field_dropdown",
      "name": "X",
      "options": [
        [ "-1", "-1" ],
        [ "-2", "-2" ],
        [ "-3", "-3" ],
        [ "-4", "-4" ],
        [ "-5", "-5" ],
        [ "-6", "-6" ],
        [ "-7", "-7" ],
        [ "-8", "-8" ],
        [ "0", "0" ],
        [ "1", "1" ],
        [ "2", "2" ],
        [ "3", "3" ],
        [ "4", "4" ],
        [ "5", "5" ],
        [ "6", "6" ],
        [ "7", "7" ],
        [ "8", "8" ]
      ]
    }
  ],
  "message2":"y : %1",  
  "args2": [
    {
      "type": "field_dropdown",
      "name": "Y",
      "options": [
        [ "-1", "-1" ],
        [ "-2", "-2" ],
        [ "-3", "-3" ],
        [ "-4", "-4" ],
        [ "-5", "-5" ],
        [ "-6", "-6" ],        
        [ "0", "0" ],
        [ "1", "1" ],
        [ "2", "2" ],
        [ "3", "3" ],
        [ "4", "4" ],
        [ "5", "5" ],
        [ "6", "6" ]
      ]
    }
  ],

  "colour":120  

};

var turn = {
  "type": "turn",  
  "message0": "Turn : ",
  "message1": "%1",
  "args1": [
    {
      "type": "field_dropdown",
      "name": "lw",
      "options": [
        [ "Left (anticlockwise)", "l" ],
        [ "Right (clockwise)", "r" ]        
      ]
    }
  ],
  "message2":"Angle : %1",  
  "args2": [
    {
      "type": "field_angle",
      "name": "angle",
      "angle":"90"      
    }
  ],

  "colour":120  

};
var faceDirection = {
  "type": "faceDirection",  
  "message0": "Point in direction : ",
  "message1": "%1",
  "args1": [
    {
      "type": "field_angle",
      "name": "angle",
      "angle":"30",
      
    }
  ],
  "nextStatement":null,
    "previousStatement":null,

  "colour":120  

};

var moveTot = {
  "type": "moveTot",  
  "message0": "Move to : ",
  "message1": "x: %1, y: %2",
  "args1": [
    {
      "type": "field_number",
      "name": "x",
      "angle":"0"      
    },
    {
      "type": "field_number",
      "name": "y",
      "angle":"0"      
    }
  ],
  "nextStatement":null,
    "previousStatement":null,

  "colour":120  

};


var movePencil = {
  "type": "movePencil",  
  "message0": "Draw a line",
  "nextStatement":null,
    "previousStatement":null,
  "colour":120  

};




var turnPen = {
  "type": "turnPen",  
  "message0": "Turn : ",
  "message1": "%1",
  "args1": [
    {
      "type": "field_dropdown",
      "name": "lw",
      "options": [
        [ "Left (anticlockwise)", "l" ],
        [ "Right (clockwise)", "r" ]        
      ]
    }
  ],
  "message2":"Angle : %1",  
  "args2": [
    {
      "type": "field_angle",
      "name": "angle",
      "angle":"90"      
    }
  ],
  "nextStatement":null,
    "previousStatement":null,

  "colour":120   
}

var mapp = {
  "type": "mapp",
  "message0": "From %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "from",
      "options": [
        ['harbin','harbin'],
        ['shenyang','shenyang'],
        ['beijing','beijing'],
        ['shijiazhuang','shijiazhuang'],
        ['taiyuan','taiyuan'],
        ['tianjin','tianjin'],
        ['qinhuangdao','qinhuangdao'],
        ['qingdao','qingdao'],
        ['dalian','dalian'],
        ['jinan','jinan'],
        ['xuzhou','xuzhou'],
        ['zhengzhou','zhengzhou'],
        ['xian','xian'],
        ['baoji','baoji'],
        ['lanzhou','lanzhou'],
        ['xining','xining'],
        ['jiangyou','jiangyou'],
        ['wuhan','wuhan'],
        ['chongqing','chongqing'],
        ['chengdu','chengdu'],
        ['dazhou','dazhou'],
        ['hefei','hefei'],
        ['nanjing','nanjing'],
        ['shanghai','shanghai'],
        ['hangzhou','hangzhou'],
        ['changsha','changsha'],
        ['guiyang','guiyang'],
        ['kunming','kunming'],
        ['guangzhou','guangzhou'],
        ['fuzhou','fuzhou'],
        ['shenzhen','shenzhen']
      ]
    }
  ],
  "message1": "through %1",
  "args1": [
    {"type": "input_statement", "name": "through"}
  ],
  "message2": "to %1",
  "args2": [
    {
      "type": "field_dropdown",
      "name": "to",
      "options": [
        ['harbin','harbin'],
        ['shenyang','shenyang'],
        ['beijing','beijing'],
        ['shijiazhuang','shijiazhuang'],
        ['taiyuan','taiyuan'],
        ['tianjin','tianjin'],
        ['qinhuangdao','qinhuangdao'],
        ['qingdao','qingdao'],
        ['dalian','dalian'],
        ['jinan','jinan'],
        ['xuzhou','xuzhou'],
        ['zhengzhou','zhengzhou'],
        ['xian','xian'],
        ['baoji','baoji'],
        ['lanzhou','lanzhou'],
        ['xining','xining'],
        ['jiangyou','jiangyou'],
        ['wuhan','wuhan'],
        ['chongqing','chongqing'],
        ['chengdu','chengdu'],
        ['dazhou','dazhou'],
        ['hefei','hefei'],
        ['nanjing','nanjing'],
        ['shanghai','shanghai'],
        ['hangzhou','hangzhou'],
        ['changsha','changsha'],
        ['guiyang','guiyang'],
        ['kunming','kunming'],
        ['guangzhou','guangzhou'],
        ['fuzhou','fuzhou'],
        ['shenzhen','shenzhen']     
      ]
    }
  ],

  "previousStatement": null,
  "nextStatement": null,
  "colour": 120
}



var city ={
  "type": "city",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "city",
      "options": [
        ['harbin','harbin'],
        ['shenyang','shenyang'],
        ['beijing','beijing'],
        ['shijiazhuang','shijiazhuang'],
        ['taiyuan','taiyuan'],
        ['tianjin','tianjin'],
        ['qinhuangdao','qinhuangdao'],
        ['qingdao','qingdao'],
        ['dalian','dalian'],
        ['jinan','jinan'],
        ['xuzhou','xuzhou'],
        ['zhengzhou','zhengzhou'],
        ['xian','xian'],
        ['baoji','baoji'],
        ['lanzhou','lanzhou'],
        ['xining','xining'],
        ['jiangyou','jiangyou'],
        ['wuhan','wuhan'],
        ['chongqing','chongqing'],
        ['chengdu','chengdu'],
        ['dazhou','dazhou'],
        ['hefei','hefei'],
        ['nanjing','nanjing'],
        ['shanghai','shanghai'],
        ['hangzhou','hangzhou'],
        ['changsha','changsha'],
        ['guiyang','guiyang'],
        ['kunming','kunming'],
        ['guangzhou','guangzhou'],
        ['fuzhou','fuzhou'],
        ['shenzhen','shenzhen']
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  
  "colour": 50
}

var cityField ={
  "type": "cityField",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "city",
      "options": [
        ['harbin','harbin'],
        ['shenyang','shenyang'],
        ['beijing','beijing'],
        ['shijiazhuang','shijiazhuang'],
        ['taiyuan','taiyuan'],
        ['tianjin','tianjin'],
        ['qinhuangdao','qinhuangdao'],
        ['qingdao','qingdao'],
        ['dalian','dalian'],
        ['jinan','jinan'],
        ['xuzhou','xuzhou'],
        ['zhengzhou','zhengzhou'],
        ['xian','xian'],
        ['baoji','baoji'],
        ['lanzhou','lanzhou'],
        ['xining','xining'],
        ['jiangyou','jiangyou'],
        ['wuhan','wuhan'],
        ['chongqing','chongqing'],
        ['chengdu','chengdu'],
        ['dazhou','dazhou'],
        ['hefei','hefei'],
        ['nanjing','nanjing'],
        ['shanghai','shanghai'],
        ['hangzhou','hangzhou'],
        ['changsha','changsha'],
        ['guiyang','guiyang'],
        ['kunming','kunming'],
        ['guangzhou','guangzhou'],
        ['fuzhou','fuzhou'],
        ['shenzhen','shenzhen']
      ]
    }
  ],
  "output": null,
  "colour": 170
}