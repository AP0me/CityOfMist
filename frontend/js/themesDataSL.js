
function saveTags(){
  var allPowerTags = {
    "id1": {
      "questionLetter": null,
      "text": null,
      "burned": false,
    },
    "id2": {
      "questionLetter": null,
      "text": null,
      "burned": false,
    },
    "id3": {
      "questionLetter": null,
      "text": null,
      "burned": false,
    },
    "id4": {
      "questionLetter": null,
      "text": null,
      "burned": false,
    }
  };
  var allWeaknessTags = {
    "id1": {
      "questionLetter": null,
      "text": null,
      "burned": false,
    },
    "id2": {
      "questionLetter": null,
      "text": null,
      "burned": false,
    },
    "id3": {
      "questionLetter": null,
      "text": null,
      "burned": false,
    },
    "id4": {
      "questionLetter": null,
      "text": null,
      "burned": false,
    },
  };

  for (let k = 0; k < 4; k++){
    let elemTextList = []; let elemLetterList = []; let elemBurnedList = [];
    document.querySelectorAll(".bottomHalf>.Power#id"+(k+1)+">.PowerTagCommon").forEach(element => {
      let elemText = element.querySelector(".powerTag").value;
      elemTextList.push(elemText);
      let elemLetter = parseInt(element.querySelector(".questionLetter>option:checked").getAttribute("id").replace("option", ""));
      elemLetterList.push(elemLetter);
      let elemBurned = element.querySelector(".burnTag").checked;
      elemBurnedList.push(elemBurned);
    });
    allPowerTags["id" + (k+1)]["text"] = elemTextList;
    allPowerTags["id" + (k+1)]["questionLetter"] = elemLetterList;
    allPowerTags["id" + (k+1)]["burned"] = elemBurnedList;

    elemTextList = []; elemLetterList = []; elemBurnedList = [];
    document.querySelectorAll(".bottomHalf>.Weakness#id"+(k+1)+">.PowerTagCommon").forEach(element => {
      let elemText = element.querySelector(".powerTag").value;
      elemTextList.push(elemText);
      let elemLetter = parseInt(element.querySelector(".questionLetter>option:checked").getAttribute("id").replace("option", ""));
      elemLetterList.push(elemLetter);
      let elemBurned = element.querySelector(".burnTag").checked;
      elemBurnedList.push(elemBurned);
    });
    allWeaknessTags["id" + (k+1)]["text"] = elemTextList;
    allWeaknessTags["id" + (k+1)]["questionLetter"] = elemLetterList;
    allWeaknessTags["id" + (k+1)]["burned"] = elemBurnedList;
  }
  return [allPowerTags, allWeaknessTags];
}
function loadTags(PowerTagTexts, WeaknessTagTexts){
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
    var powertagTexts = PowerTagTexts["id"+(ID_index+1)]["text"];
    var powertagQuestionLetter = PowerTagTexts["id"+(ID_index+1)]["questionLetter"];
    var burnedTagValues = PowerTagTexts["id"+(ID_index+1)]["burned"];
    PowerTagCommons = document.querySelectorAll(".Power#id"+(ID_index+1)+">.PowerTagCommon");
    PowerTagCommons.forEach(PowerTagCommon => {             //remove all currently displayed PowerTags.
      PowerTagCommon.parentNode.removeChild(PowerTagCommon);
    });
    for(var i=0; i<powertagTexts.length; i++){
      var tagText = powertagTexts[i];
      PowerPlusDiv = document.querySelector(".bottomHalf>.Power#id"+(ID_index+1)+">.PlusDiv");
      newPlusDiv(PowerPlusDiv, translatorDict[powertagQuestionLetter[i].toString()]);
      PowerTags = document.querySelectorAll(".bottomHalf>.Power#id"+(ID_index+1)+">.PowerTagCommon>.powerTag");
      PowerTags[PowerTags.length-1].value = tagText;
      burnedTags = document.querySelectorAll(".bottomHalf>.Power#id"+(ID_index+1)+">.PowerTagCommon>.burnTag");
      burnedTags[i].checked = parseInt(burnedTagValues[i]); 
    }

    var weaknesstagTexts = WeaknessTagTexts["id"+(ID_index+1)]["text"];
    var weaknesstagQuestionLetter = WeaknessTagTexts["id"+(ID_index+1)]["questionLetter"];
    var burnedTagValues = WeaknessTagTexts["id"+(ID_index+1)]["burned"];
    PowerTagCommons = document.querySelectorAll(".Weakness#id"+(ID_index+1)+">.PowerTagCommon");
    PowerTagCommons.forEach(PowerTagCommon => {             //remove all currently displayed WeaknessTags.
      PowerTagCommon.parentNode.removeChild(PowerTagCommon);
    });
    for(var i=0; i<weaknesstagTexts.length; i++){
      var tagText = weaknesstagTexts[i];
      WeaknessPlusDiv = document.querySelector(".bottomHalf>.Weakness#id"+(ID_index+1)+">.PlusDiv");
      newPlusDiv(WeaknessPlusDiv, translatorDict[weaknesstagQuestionLetter[i].toString()]);
      WeaknessTags = document.querySelectorAll(".bottomHalf>.Weakness#id"+(ID_index+1)+">.PowerTagCommon>.powerTag");
      WeaknessTags[WeaknessTags.length-1].value = tagText;
      burnedTags = document.querySelectorAll(".bottomHalf>.Weakness#id"+(ID_index+1)+">.PowerTagCommon>.burnTag");
      burnedTags[i].checked = parseInt(burnedTagValues[i]);
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
    if(themeTypeIndicators[i]=="1"){
      if(TypeHeaders[i].getAttribute("class")=="TypeHeader logos"){
        TypeHeaders[i].click();
        themeTypes[i].selectedIndex = checkedThemeTypeIds[i] - Math.round(checkedThemeTypeIds[i] / 20) * 20;
      }
      else{
        themeTypes[i].selectedIndex = checkedThemeTypeIds[i] - Math.round(checkedThemeTypeIds[i] / 20) * 20;
      }
    }
    else{
      if(TypeHeaders[i].getAttribute("class")=="TypeHeader mythos"){
        TypeHeaders[i].click();
        themeTypes[i].selectedIndex = checkedThemeTypeIds[i] - Math.round(checkedThemeTypeIds[i] / 10) * 10;
      }
      else{
        themeTypes[i].selectedIndex = checkedThemeTypeIds[i] - Math.round(checkedThemeTypeIds[i] / 10) * 10;
      }
    }
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
function postRequest(data, url) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(result => { return result; })
  .catch(error => { return ':('; });
}
function saveThemeData(){
  var IDsaveSlotChosen = document.querySelector(".saveSlots>option:checked").getAttribute("id");
  
  if(IDsaveSlotChosen!=null){
    [themeTypeJson, logosMythosJson] = saveThemeTypes();
    [titleTextJson, textBoxTextJson] = saveThemeTitleAndMystery();
    var CheckboxesJson = saveCheckboxes();
    [allPowerTags, allWeaknessTags] = saveTags();
    themeData = {
      "ThemeType": [themeTypeJson["a"], logosMythosJson["a"]],
      "TextData": [titleTextJson["title"], textBoxTextJson["textBox"]],
      "Checkboxes": CheckboxesJson,
      "TagData": [allPowerTags, allWeaknessTags],
    };
    window.localStorage.setItem(IDsaveSlotChosen+" themeData", JSON.stringify(themeData));

    postData = {
      "themeData": themeData,
      "navData": { "userName": "public", "password": "password", "heroSubID": IDsaveSlotChosen.replace("saveSlotName", "") }
    }
    url = "http://localhost:5000/saveThemes";
    console.log("post sent");
    postRequest(postData, url);
  }
}
function loadThemeData(){
  var IDsaveSlotChosen = document.querySelector(".saveSlots>option:checked").getAttribute("id");
  if(IDsaveSlotChosen!=null){
    themeData = JSON.parse(window.localStorage.getItem(IDsaveSlotChosen+" themeData"));
    if(themeData){
      console.log(themeData);
      [checkedThemeTypeIds, themeTypeIndicators] = themeData["ThemeType"];
      [titleText, textBoxText] = themeData["TextData"];
      Checkboxes = themeData["Checkboxes"];
      [allPowerTags, allWeaknessTags] = themeData["TagData"];
      
      loadThemeTypes(themeTypeIndicators, checkedThemeTypeIds);
      loadThemeTitleAndMystery(titleText, textBoxText);
      loadCheckboxes(Checkboxes);
      loadTags(allPowerTags, allWeaknessTags);
    }
    else{
      IDsaveSlotChosenAsNum = parseInt(IDsaveSlotChosen.replace("saveSlotName", ""));
      url = "http://localhost:5000/loadTheme";
      postedData = { "userName": "public", "password": "password", "heroSubID": IDsaveSlotChosenAsNum };
      (async () => {
        themeData = await postRequest(postedData, url);
        window.localStorage.setItem(IDsaveSlotChosen+" themeData", JSON.stringify(themeData));
        loadThemeData();
      })();
    }
  }
}
