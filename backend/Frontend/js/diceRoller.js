var resultDisplays = document.querySelectorAll(".resultDisplay");
var numberOfDiceDiv = document.querySelector(".numberOfDice");rollResult
var rollResult = document.querySelector(".rollResult");

function addDiceToDisplay(docFragment){
  var resultDisplayText = document.createElement("div");
  resultDisplayText.setAttribute("class", "resultDisplayText");
  resultDisplayText.innerHTML = "?";
  var newResultDisplay = document.createElement("div");
  newResultDisplay.setAttribute("class", "resultDisplay");
  newResultDisplay.appendChild(resultDisplayText)
  docFragment.appendChild(newResultDisplay);
}

function showDiceRoll(){
  var numberOfDice = parseInt(numberOfDiceDiv.querySelector("div").innerHTML);
  rollResult.innerHTML = "";
  rollResult.removeAttribute("color");
  var docFragment = document.createDocumentFragment();
  for(var i=0; i<numberOfDice; i++){
    addDiceToDisplay(docFragment);
  }
  rollResult.appendChild(docFragment);

  var resultDisplays = document.querySelectorAll(".resultDisplay");
  var maxroll = parseInt(document.querySelector(".diceSelector>option:checked").getAttribute("maxroll"));
  resultDisplays.forEach(resultDisplay => {
    resultDisplay.setAttribute("tempcolor", "tempgreen");
    var resultDisplayText = resultDisplay.querySelector(".resultDisplayText");
    var rollMilliSeconds = Math.random()*500+100;
    setTimeout(function(){
      resultDisplay.removeAttribute("tempcolor");
      var randInt = Math.floor(Math.random()*maxroll)+1;
      resultDisplayText.innerHTML = randInt;
    }, rollMilliSeconds);
  });
}

function plusOneDie(elem){
  var numDisplay = elem.querySelector("div");
  numDisplay.innerHTML = parseInt(numDisplay.innerHTML)+1;
}

document.querySelector(".diceSelector").selectedIndex = 1;
selectedIndex
