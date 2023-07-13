function addCommonTricks(){
  allPowerTags = document.querySelectorAll(".Power>.PowerTagCommon");
  allWeaknessTags = document.querySelectorAll(".Weakness>.PowerTagCommon");
  allPWs = document.querySelector(".allPWs");
  allPowerTags.forEach(tag => {
    tag = tag.cloneNode(true);
    tag.setAttribute("tagType", "power");
    questionLetter = tag.querySelector(".questionLetter");
    questionLetter.parentNode.removeChild(questionLetter);
    allPWs.appendChild(tag);
  });
  allWeaknessTags.forEach(tag => {
    tag = tag.cloneNode(true);
    tag.setAttribute("tagType", "weakness");
    questionLetter = tag.querySelector(".questionLetter");
    questionLetter.parentNode.removeChild(questionLetter);
    allPWs.appendChild(tag);
  });
}
function saveTrick(){
  saveSlotChosenIntID = document.querySelector(".saveSlots>option:checked").getAttribute("id");
  commonTricks = window.localStorage.getItem(saveSlotChosenIntID+" commonTricks");
  if(commonTricks==null){
    commonTricks = {
      "tricks": [],
    };
  }
  else{
    commonTricks = JSON.parse(commonTricks);
  }
  commonTrick = {
    "trickName": null,
    "trickPowers": [],
    "trickPowersCount": null,
    "trickWeaknesses": [],
    "trickWeaknessesCount": null,
  };

  trickPowersCount = 0; trickWeaknessesCount = 0;
  document.querySelectorAll(".allPWs>.PowerTagCommon").forEach(element => {
    if( element.querySelector(".burnTag:checked")!=null ){
      elemText = element.querySelector(".powerTag").value;
      divWithElemText = document.createElement("div");
      if(element.getAttribute("tagType")=="power"){
        divWithElemText.setAttribute("tagType", "power");
        trickType = "trickPowers";
        trickPowersCount++;
      }
      if(element.getAttribute("tagType")=="weakness"){
        divWithElemText.setAttribute("tagType", "weakness");
        trickType = "trickWeaknesses";
        trickWeaknessesCount++;
      }
      divWithElemText.innerText = elemText;
      document.querySelector(".actionList").appendChild(divWithElemText);

      trickName = document.querySelector(".trickName").value;
      commonTrick = JSON.parse(JSON.stringify(commonTrick));
      commonTrick[trickType].push(elemText);
    }
  });
  commonTrick["trickName"] = trickName;
  commonTrick["trickPowersCount"] = trickPowersCount;
  commonTrick["trickWeaknessesCount"] = trickWeaknessesCount;
  commonTricks["tricks"].push(commonTrick);
  window.localStorage.setItem(saveSlotChosenIntID+" commonTricks", JSON.stringify(commonTricks));
}
function loadTricks(){
  saveSlotChosenIntID = document.querySelector(".saveSlots>option:checked").getAttribute("id");
  commonTricks = JSON.parse(window.localStorage.getItem(saveSlotChosenIntID+" commonTricks"))["tricks"];
  actionList = document.querySelector(".actionList");
  for (var i = 0; i < commonTricks.length; i++) {
    commonTrick = commonTricks[i];
    for (var k = 0; k < commonTrick["trickPowersCount"]; k++) {
      thickPowerText = commonTrick["trickPowers"][k];
      divWithTagText = document.createElement("div");
      divWithTagText.setAttribute("class", "powerTag");
      divWithTagText.innerHTML = thickPowerText;
      divWithTagText.setAttribute("tagType", "power");
      actionList.appendChild(divWithTagText);
    }
    for (var k = 0; k < commonTrick["trickWeaknessesCount"]; k++) {
      trickWeaknesseText = commonTrick["trickWeaknesses"][k];
      divWithTagText = document.createElement("div");
      divWithTagText.setAttribute("class", "powerTag");
      divWithTagText.innerHTML = trickWeaknesseText;
      divWithTagText.setAttribute("tagType", "weakness");
      actionList.appendChild(divWithTagText);
    }
  }
}