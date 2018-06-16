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
  
  "message0": "Pig's coordinate: ",
  "message1":"x : %1",  
  "args1": [
    {
      "type": "field_dropdown",
      "name": "X",
      "options": [
        [ "1", "1" ],
        [ "2", "2" ]
      ]
    }
  ],
  "message2":"y : %1",  
  "args2": [
    {
      "type": "field_dropdown",
      "name": "Y",
      "options": [
        [ "1", "1" ],
        [ "2", "2" ]
      ]
    }
  ],

  "colour":120  

};

var birdCoordinate = {
  "type": "birdCoordinate",
  
  "message0": "Bird's coordinate: ",
  "message1":"x : %1",  
  "args1": [
    {
      "type": "field_dropdown",
      "name": "X",
      "options": [
        [ "1", "1" ],
        [ "2", "2" ]
      ]
    }
  ],
  "message2":"y : %1",  
  "args2": [
    {
      "type": "field_dropdown",
      "name": "Y",
      "options": [
        [ "1", "1" ],
        [ "2", "2" ]
      ]
    }
  ],

  "colour":120  

};