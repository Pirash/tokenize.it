(function init() {
  
  var baseUrl = "http://tokenize.it";
  
  $(document).ready(function(){
    $('.tokenize button.start').click(openTokenizer);
    $('.tokenize button.complete').click(closeTokenizer);
    $('.detokenize button.start').click(openDetokenizer);
    $('.detokenize button.complete').click(closeDetokenizer);
    
    $('.tokenize button.do').click(tokenize);
    $('.tokenize .input')
      .change(clearTokenizeOutput)
      .keydown(clearTokenizeOutput)
      .focus(selectAll);
    $('.detokenize button.do').click(detokenize);
    $('.detokenize .input')
      .change(clearDetokenizeOutput)
      .keydown(clearDetokenizeOutput)
      .focus(selectAll);
    $('.detokenize .output')
      .focus(selectAll);
    $('.tokenize .output')
      .focus(selectAll);  
    
  });

  function openTokenizer(){
    $('.tokenize button.start').slideUp();
    $('.tokenize .info').slideUp();
    $('.tokenize .hidden').slideDown();
    $('.tokenize .output').prop('disabled', true);
  }

  function closeTokenizer(){
    $('.tokenize button.start').slideDown();
    $('.tokenize .info').slideUp();
    $('.tokenize .hidden').slideUp();
  }  
  
  function openDetokenizer(){
    $('.detokenize button.start').slideUp();
    $('.detokenize .info').slideUp();
    $('.detokenize .hidden').slideDown();
    $('.detokenize .output').prop('disabled', true);
  }

  function closeDetokenizer(){
    $('.detokenize button.start').slideDown();
    $('.detokenize .info').slideUp();
    $('.detokenize .hidden').slideUp();
  } 
  
  function clearTokenizeOutput(){
    $('.tokenize .output').val('');
  }

  function clearDetokenizeOutput(){
    $('.detokenize .output').val('');
  }

  function selectAll(){
    $(this).select();
  }

  function tokenize(){
    var input = $('.tokenize .input').val();
    $('.tokenize .input').prop('disabled', true);
    $.ajax({
      url     : baseUrl + "/tokenizer",
      data    : {value : input},
      method  : 'POST'
    }).done(tokenizeDone);
  }

  function tokenizeDone(result){
    animateOut($('.tokenize .input'));
    animateIn($('.tokenize .output'), result);
    $('.tokenize .output').prop('disabled', false);
  }

  function detokenize(){
    var input = $('.detokenize .input').val();
    $('.detokenize .input').prop('disabled', true);
    $.ajax({
      url     : baseUrl + "/tokenizer",
      data    : {token : input},
      method  : 'POST'
    }).done(detokenizeDone);
  }

  function detokenizeDone(result){
    animateOut($('.detokenize .input'));
    animateIn($('.detokenize .output'), result);
    $('.detokenize .output').prop('disabled', false);
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

} )();