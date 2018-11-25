$(document).ready(function(){

	$("button#submit").click(function(){
		var checkedV = [];
		$("input[type='checkbox']:checked").each(function (index,item){
			checkedV.push($(this).val());
		});
		parent.test()
	});


});