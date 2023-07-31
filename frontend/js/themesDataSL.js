
function saveTags(){
  allTags = {
    "id1": {
      "questionLetter": null,
      "text": null,
      "burned": null,
      "tagType": null
    },
    "id2": {
      "questionLetter": null,
      "text": null,
      "burned": null,
      "tagType": null
    },
    "id3": {
      "questionLetter": null,
      "text": null,
      "burned": null,
      "tagType": null
    },
    "id4": {
      "questionLetter": null,
      "text": null,
      "burned": null,
      "tagType": null
    }
  };

  for (let k = 0; k < 4; k++){
    var powerElemTextList = []; var powerElemLetterList = []; var powerElemBurnedList = []; var TagTypeList = [];
    document.querySelectorAll(".bottomHalf>.Power#id"+(k+1)+">.PowerTagCommon").forEach(element => {
      var elemText = element.querySelector(".powerTag").value;
      powerElemTextList.push(elemText);
      var elemLetter = parseInt(element.querySelector(".questionLetter>option:checked").getAttribute("id").replace("option", ""));
      powerElemLetterList.push(elemLetter);
      var elemBurned = element.querySelector(".burnTag").checked;
      powerElemBurnedList.push(elemBurned+0);
      TagTypeList.push(1);
    });
    allTags["id" + (k+1)]["text"] = powerElemTextList;
    allTags["id" + (k+1)]["questionLetter"] = powerElemLetterList;
    allTags["id" + (k+1)]["burned"] = powerElemBurnedList;
    allTags["id" + (k+1)]["tagType"] = TagTypeList;

    var weakElemTextList = []; var weakElemLetterList = []; var weakElemBurnedList = [];
    document.querySelectorAll(".bottomHalf>.Weakness#id"+(k+1)+">.PowerTagCommon").forEach(element => {
      let elemText = element.querySelector(".powerTag").value;
      weakElemTextList.push(elemText);
      let elemLetter = parseInt(element.querySelector(".questionLetter>option:checked").getAttribute("id").replace("option", ""));
      weakElemLetterList.push(elemLetter);
      let elemBurned = element.querySelector(".burnTag").checked;
      weakElemBurnedList.push(elemBurned+0);
      TagTypeList.push(0);
    });

    elemTextList   = powerElemTextList  .concat(weakElemTextList);
    elemLetterList = powerElemLetterList.concat(weakElemLetterList);
    elemBurnedList = powerElemBurnedList.concat(weakElemBurnedList);
    allTags["id" + (k+1)]["text"]           = elemTextList;
    allTags["id" + (k+1)]["questionLetter"] = elemLetterList;
    allTags["id" + (k+1)]["burned"]         = elemBurnedList;
  }
  return allTags;
}
function loadTags(allTags){
  translatorDict = {
    "0": "A",
    "1": "B",
    "2": "C",
    "3": "D",
    "4": "E",
    "5": "F",
    "6": "G",
    "7": "H",
    "8": "I",
    "9": "J",
  };
  for (var ID_index = 0; ID_index < 4; ID_index++){
    var tagLength = allTags["id"+(ID_index+1)]["tagType"].length;
    var powerLength = allTags["id"+(ID_index+1)]["tagType"].filter(function(tagType){ return tagType==1; }).length;
    var tagTexts = allTags["id"+(ID_index+1)]["text"];
    var tagQuestionLetter = allTags["id"+(ID_index+1)]["questionLetter"];
    var tagBurned = allTags["id"+(ID_index+1)]["burned"];

    PowerTagCommons = document.querySelectorAll(".Power#id"+(ID_index+1)+">.PowerTagCommon");
    PowerTagCommons.forEach(PowerTagCommon => {             //remove all currently displayed PowerTags.
      PowerTagCommon.parentNode.removeChild(PowerTagCommon);
    });
    PowerTagCommons = document.querySelectorAll(".Weakness#id"+(ID_index+1)+">.PowerTagCommon");
    PowerTagCommons.forEach(PowerTagCommon => {             //remove all currently displayed WeaknessTags.
      PowerTagCommon.parentNode.removeChild(PowerTagCommon);
    });

    var powerDiv = document.querySelector(".bottomHalf>.Power#id"+(ID_index+1));
    weaknessDiv = document.querySelector(".bottomHalf>.Weakness#id"+(ID_index+1));

    var k=0;
    for(var i=0; i<powerLength; i++){
      var tagText = tagTexts[i];
      powerPlusDiv = powerDiv.querySelector(".PlusDiv");
      newPlusDiv(powerPlusDiv, translatorDict[tagQuestionLetter[i].toString()]);
      PowerTagElems = powerDiv.querySelectorAll(".powerTag");
      PowerTagElems[PowerTagElems.length-1].value = tagText;
      burnedTagElems = powerDiv.querySelectorAll(".burnTag");
      burnedTagElems[k].checked = parseInt(tagBurned[i]); k++;
    }

    k=0;
    for(var i=powerLength; i<tagLength; i++){
      var tagText = tagTexts[i];
      weaknessPlusDiv = weaknessDiv.querySelector(".PlusDiv");
      newPlusDiv(weaknessPlusDiv, translatorDict[tagQuestionLetter[i].toString()]);
      weaknessTagElems = weaknessDiv.querySelectorAll(".powerTag");
      weaknessTagElems[weaknessTagElems.length-1].value = tagText;
      burnedTagElems = weaknessDiv.querySelectorAll(".burnTag");
      burnedTagElems[k].checked = parseInt(tagBurned[i]); k++;
    }
  }
}
function saveThemeTypes(){
  checkedThemeTypeIds = [];
  document.querySelectorAll(".TypeTextBox>option:checked").forEach(checkedOption => {
    checkedThemeTypeId = parseInt(checkedOption.getAttribute("id").replace("option","")[1]);
    checkedThemeTypeIds.push(checkedThemeTypeId);
  });;
  returnCheckedThemeTypeIds = { "a": checkedThemeTypeIds }

  themeTypeIndicators = [];
  document.querySelectorAll(".theme").forEach(theme => {
    themeTypeClass = theme.getAttribute("class");
    themeTypeIndicator = themeTypeClass.substring(themeTypeClass.indexOf(" ")+1, themeTypeClass.length);
    if(themeTypeIndicator=="logos"){
      themeTypeIndicators.push(0);
    }
    else if(themeTypeIndicator=="mythos"){ 
      themeTypeIndicators.push(1);
    }
  });
  returnThemeTypeIndicators = { "a": themeTypeIndicators };
  return [returnCheckedThemeTypeIds, returnThemeTypeIndicators];
}
function loadThemeTypes(themeTypeIndicators, checkedThemeTypeIds){
  TypeHeaders = document.querySelectorAll(".TypeHeader");
  themeTypes = document.querySelectorAll(".TypeTextBox");

  for (var i = 0; i < themeTypeIndicators.length; i++){
    if((themeTypeIndicators[i]=="1" && TypeHeaders[i].getAttribute("class")=="TypeHeader logos" ) ||
       (themeTypeIndicators[i]=="0" && TypeHeaders[i].getAttribute("class")=="TypeHeader mythos")){
        console.log(themeTypeIndicators[i]=="0", TypeHeaders[i].getAttribute("class"));
      TypeHeaders[i].click();
    }
    themeTypes[i].selectedIndex = checkedThemeTypeIds[i];
  }
  displayQuestions();
}
function saveThemeTitleAndMystery(){
  titleText={ "title": [] };
  var titles = document.querySelectorAll('.Title');
  for (let i=0; i < titles.length; i++){
    var title = titles[i];
    titleText["title"].push(title.innerHTML);
  }

  textBoxText={ "textBox": [] };
  textBoxes = document.querySelectorAll(".Mystery>.TextBox");
  for (let i=0; i < textBoxes.length; i++){
    var textBox = textBoxes[i];
    textBoxText["textBox"].push(textBox.innerHTML);
  }
  return [titleText, textBoxText];
}
function loadThemeTitleAndMystery(titleText, textBoxText){
  var titles = document.querySelectorAll('.Title');
  for(let i=0; i < titles.length; i++){
    var title = titles[i];
    title.innerHTML = titleText[i];
  }
  var textBoxes = document.querySelectorAll('.Mystery>.TextBox');
  for(let i=0; i < textBoxes.length; i++){
    var textBox = textBoxes[i];
    textBox.innerHTML = textBoxText[i];
  }
}
function saveCheckboxes(){
  Checkboxes = {
    "theme1": {
      "attention": [],
      "fade": [],
    },
    "theme2": {
      "attention": [],
      "fade": [],
    },
    "theme3": {
      "attention": [],
      "fade": [],
    },
    "theme4": {
      "attention": [],
      "fade": [],
    }
  };
  for (var i = 1; i < 5; i++){
    document.querySelectorAll(".theme#theme"+i+">.checkAttentionFade>.Attention>.AttentionCheckContainer>.AttentionCheck").forEach(attentionCheck => {
      Checkboxes["theme"+i]["attention"].push(attentionCheck.checked);
    });
    document.querySelectorAll(".theme#theme"+i+">.checkAttentionFade>.Fade>.FadeCheckContainer>.FadeCheck").forEach(fadeCheck => {
      Checkboxes["theme"+i]["fade"].push(fadeCheck.checked);
    });
  }
  return Checkboxes;
}
function loadCheckboxes(Checkboxes){
  for (var i = 1; i < 5; i++){
    var k=0;
    document.querySelectorAll(".theme#theme"+i+">.checkAttentionFade>.Attention>.AttentionCheckContainer>.AttentionCheck")
    .forEach(attentionCheck => {
      attentionCheck.checked = Checkboxes["theme"+i]["attention"][k]; k++;
    }); k=0;
    document.querySelectorAll(".theme#theme"+i+">.checkAttentionFade>.Fade>.FadeCheckContainer>.FadeCheck")
    .forEach(fadeCheck => {
      fadeCheck.checked = Checkboxes["theme"+i]["fade"][k]; k++;
    });
  }
}

function saveThemeData(){
  var IDsaveSlotChosen = document.querySelector(".saveSlots>option:checked").getAttribute("id");
  
  if(IDsaveSlotChosen!=null){
    [themeTypeJson, logosMythosJson] = saveThemeTypes();
    [titleTextJson, textBoxTextJson] = saveThemeTitleAndMystery();
    var CheckboxesJson = saveCheckboxes();
    allTags = saveTags();
    themeData = {
      "ThemeType": [themeTypeJson["a"], logosMythosJson["a"]],
      "TextData": [titleTextJson["title"], textBoxTextJson["textBox"]],
      "Checkboxes": CheckboxesJson,
      "TagData": allTags,
    };
    window.localStorage.setItem(IDsaveSlotChosen+" themeData", JSON.stringify(themeData));

    postData = {
      "themeData": themeData,
      "navData": { "userName": window.localStorage.getItem("username"), "password": window.localStorage.getItem("password"), "heroSubID": IDsaveSlotChosen.replace("saveSlotName", "") }
    }
    url = window.location.origin+"/saveThemes";
    console.log("post sent");
    postRequest(postData, url);
  }
}
function loadThemeData(){
  var IDsaveSlotChosen = document.querySelector(".saveSlots>option:checked").getAttribute("id");
  if(IDsaveSlotChosen!=null){
    themeData = JSON.parse(window.localStorage.getItem(IDsaveSlotChosen+" themeData"));
    if(themeData){
      [checkedThemeTypeIds, themeTypeIndicators] = themeData["ThemeType"];
      [titleText, textBoxText] = themeData["TextData"];
      Checkboxes = themeData["Checkboxes"];
      allTags = themeData["TagData"];
      
      loadThemeTypes(themeTypeIndicators, checkedThemeTypeIds);
      loadThemeTitleAndMystery(titleText, textBoxText);
      loadCheckboxes(Checkboxes);
      loadTags(allTags);
    }
    else{
      IDsaveSlotChosenAsNum = parseInt(IDsaveSlotChosen.replace("saveSlotName", ""));
      url = window.location.origin+"/loadTheme";
      postedData = { "userName": window.localStorage.getItem("username"), "password": window.localStorage.getItem("password"), "heroSubID": IDsaveSlotChosenAsNum };
      (async () => {
        themeData = await postRequest(postedData, url);
        if(themeData != ":("){
          console.log(themeData)
          window.localStorage.setItem(IDsaveSlotChosen+" themeData", JSON.stringify(themeData));
          loadThemeData();
        }
        else{
          console.log("Nooo")
        }
      })();
    }
  }
}
