let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let message = document.getElementById('message');
let results = document.getElementById('results');
let code = document.getElementById('code');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value ==='' && attempt.value === '') {
      setHiddenFields();
    }
    if(!validateInput(input.value)) {
      return false;
    }
    else {
      attempt.value++;
    }
    if(getResults(input)) {
      setMessage("You Win! :)")
      showAnswer(true)
      showReplay()
    }
    else if(!getResults(input) && attempt >= 10) {
      setMessage("You Lose! :(")
      showAnswer(false)
      showReplay()
    }
    else {
      setMessage("Incorrect, try again.")
    }
}

function setHiddenFields() {
  attempt.value = 0;
  answer.value = Math.floor(Math.random()*9999).toString();
  while (answer.value.length<4) {
    answer.value = '0' + answer.value;
  }
}

function setMessage(input) {
  message.innerHTML = input;
}

function validateInput (input) {
  if(input.length===4) {
    return true;
  }
  else {
    setMessage('Guesses must be exactly 4 characters long.');
    return false;
  }
}

function getResults(input) {
  let correct = 0
  let output = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">' + '<div>'
  for(var i=0, len=input.length; i<len; i++) {
    if(input[i]===answer[i]) {
      output += '<span class="glyphicon glyphicon-ok"></span>'
      correct++
    }
    else if(answer.value.indexOf(input[i])>=0) {
      output += '<span class="glyphicon glyphicon-transfer"></span>'
    }
    else {
      output += '<span class="glyphicon glyphicon-remove"></span>'
    }
  }
  output += '</div>'
  results.innerHTML = output
  if(correct===4) {
    return true
  }
  else {
    return false
  }
}

function showAnswer(bool) {
  code.innerHTML = answer.value;
  if(bool) code.className += ' success'
  else code.className += ' failure'
}

function showReplay() {
  document.getElementById('guessing-div').style.display = 'none';
  document.getElementById('replay-div').style.display = 'block';
}
