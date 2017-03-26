$(document).ready(function(){
  $('.tokenize button').click(tokenize);
  $('.detokenize button').click(detokenize);
});

function tokenize(){
  var input = $('.tokenize .input').val();
  $.ajax({
	url  : "/tokenizer",
	data : {value : input}
  }).done(tokenizeDone);
}

function tokenizeDone(result){
  animateOut($('.tokenize .input'));
  animateIn($('.tokenize .output'), result);
}

function detokenize(){
  var input = $('.detokenize .input').val();
  $.ajax({
	url  : "/tokenizer",
	data : {token : input}
  }).done(detokenizeDone);
}

function detokenizeDone(result){
  animateOut($('.detokenize .input'));
  animateIn($('.detokenize .output'), result);
}

function animateIn(element, text){
	if(!text) return;
	var DURATION = 2000,
	    STEPS = 20,
	    stepDuration = DURATION / STEPS,
	    timer = setInterval(doStep, stepDuration),
		step = 0;
		
	function doStep(){
		step++;
		element.val(text.substring(0, step * Math.ceil(text.length / STEPS)));
		if(step >= STEPS) clearInterval(timer);
	};
}

function animateOut(element, text){
	if(!text) text = element.val();
	var DURATION = 2000,
	    STEPS = 20,
	    stepDuration = DURATION / STEPS,
	    timer = setInterval(doStep, stepDuration),
		step = STEPS;
		
	function doStep(){
		step--;
		element.val(text.substring(0, step * Math.ceil(text.length / STEPS)));
		if(step <= 0) clearInterval(timer);
	};
}