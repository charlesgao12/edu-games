var cases=[]; // the cases from json files
var caseIndex = -1;//the case index which is showing
var a_case = null;
var wrong_answers =new Map();




function read(result){// the jsonp method to read json objects into cases list
	cases.push(result);
}
function showResults(){
	console.log(wrong_answers.size)
	var correctness=100*(cases.length-wrong_answers.size)/cases.length
	if(correctness==100){
		$("#redo_title").hide();

	}else{
		$("#redo_title").show();
	}

	$("#q_and_a").hide();

	$("#results").show();
	$("#correctness").html(correctness+"%");
	$("#results_cases").empty();

	wrong_answers.forEach(function(v,k){

		$("#results_cases").append('<div id="result_q">'+getQuestionHtm(v)+'</div><br>');
		

		appendAnswers(v,"#results_cases");



/*
		$("#results_cases").append('<input type="checkbox" name="answersbox" value="0" '+getCheckedStr(v.answer.charAt(0))+'>A. '+v.answers[0]+'</input> <br>');
		$("#results_cases").append('<input type="checkbox" name="answersbox" value="1" '+getCheckedStr(v.answer.charAt(1))+'>B. '+v.answers[1]+'</input> <br>');
		$("#results_cases").append('<input type="checkbox" name="answersbox" value="2" '+getCheckedStr(v.answer.charAt(2))+'>C. '+v.answers[2]+'</input> <br>');
		$("#results_cases").append('<input type="checkbox" name="answersbox" value="3" '+getCheckedStr(v.answer.charAt(3))+'>D. '+v.answers[3]+'</input> <br><br>');
*/		
	});

}
function asciiTransform(i){//return a char, if i=0, return A; i =1 return B...
	return String.fromCharCode('A'.charCodeAt(0)+i);
}

function getQuestionHtm(a_case){
	var anQhtm="";

	a_case.question.forEach(function(v,i,arr){
		if(v.startsWith("pics/")){
			anQhtm+="<img src='"+v+"'></img>"

		}else{
			anQhtm+=v;

		}

	});

	return a_case.index+". "+anQhtm;	

}

function appendAnswers(a_case,id){	 

	a_case.answers.forEach(function(av,i,arr){
		var anAnswerHtml = "";
		av.forEach(function(v,i,arr){
			if(v.startsWith("pics/")){
				anAnswerHtml+="<img src='"+v+"'></img>"

			}else{
				anAnswerHtml+=v;

			}
		})
		$(id).append('<input type="checkbox" name="answersbox" value="'+i+'" '+getCheckedStr(a_case.answer.charAt(i))+'>'+asciiTransform(i)+'. '+anAnswerHtml+'</input> <br><br>');
	});
}

function showNextCase(){
	a_case = getNextCase();
	if(a_case == null){
		showResults();
	}else{
		$("#q_and_a").show();

		$("#results").hide();

		
		$("#question").html(getQuestionHtm(a_case));

		$("#answer").empty();

		appendAnswers(a_case,"#answer");


		//$("#answer").append('<input type="checkbox" name="answersbox" value="0" '+getCheckedStr(a_case.answer.charAt(0))+'>A. '+a_case.answers[0]+'</input> <br><br>');
		//$("#answer").append('<input type="checkbox" name="answersbox" value="1" '+getCheckedStr(a_case.answer.charAt(1))+'>B. '+a_case.answers[1]+'</input> <br><br>');
		//$("#answer").append('<input type="checkbox" name="answersbox" value="2" '+getCheckedStr(a_case.answer.charAt(2))+'>C. '+a_case.answers[2]+'</input> <br><br>');
		//$("#answer").append('<input type="checkbox" name="answersbox" value="3" '+getCheckedStr(a_case.answer.charAt(3))+'>D. '+a_case.answers[3]+'</input> <br><br>');
	}

	if(isTheLastCase()){
		$("button#next").attr("disabled",true);
		$("button#submit").attr("disabled",false);
	}else{
		$("button#next").attr("disabled",false);
		$("button#submit").attr("disabled",true);
	}
	

	

}

function getNextCase(){//return the next case, start from 0
	++caseIndex;
	var output = null;
	if(caseIndex<cases.length){
		output= cases[caseIndex];
		output.index = caseIndex+1;
	}
		
	return output;
	
}

function isTheLastCase(){//return whether it's the last case
	return caseIndex >= cases.length-1;
}

function showCase(i){//show index i case
	caseIndex = i-1;
	showNextCase();

}

function getCheckedStr(ch){

	if (ch == '1'){
		//console.log(1);
		return "checked";
	}else{
		//console.log(0);
		return "";
	}

}





$(document).ready(function(){



	for(i=0;i<cases.length;i++){
		var display_index = i+1;

		$("#cases").append('<li><a href="javascript:showCase('+i+');">第'+display_index+'题</a></li>');
	}	
	
	$().maps();
	
	$("#results").hide();
	showNextCase();




	

	

	

	

	
	function updateAnswer(){//store the answers
		var chk_value =[0,0,0,0]; 
		$("#answer").find('input[name="answersbox"]:checked').each(function(){ //遍历
			chk_value[parseInt($(this).val())] = 1;     
				 
		}); 
		    
		var chk_value_b="";

		for(i = 0; i<chk_value.length;i++){
			chk_value_b+=chk_value[i];

		}
		a_case.answer=chk_value_b;
		if(a_case.correct == chk_value_b){
			wrong_answers.delete(a_case.index);
		}else{
			wrong_answers.set(a_case.index,a_case);
		}
	}
	

	$("button#next").click(function(){

		updateAnswer();		
		showNextCase();

		
	});

	$("button#submit").click(function(){
		updateAnswer();
		showNextCase();
		
	});
	$("button#redo").click(function(){
		showCase(0);
		
	});




});