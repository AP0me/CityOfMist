
function newSaveSlot(){
  var saveSlots = document.querySelector(".saveSlots");
  var saveSlotName = document.querySelector(".saveSlotName").value;
  newSlotOption = document.createElement("option");
  saveSlotsOptionsLength = saveSlots.options.length-1;
  newSlotOption.setAttribute("id", "saveSlotName"+saveSlotsOptionsLength);
  newSlotOption.innerHTML = saveSlotName;
  saveSlots.appendChild(newSlotOption);

  saveSlotsString = window.localStorage.getItem("saveSlotsData");
  if(saveSlotsString==null){
    saveSlotsData={
      "saveSlotNames": [],
      "saveSlotIDs": [],
    }
    window.localStorage.setItem("saveSlotsData", JSON.stringify(saveSlotsData));
  }
  else{ saveSlotsData = JSON.parse(saveSlotsString); }
  saveSlotsData["saveSlotNames"].push(saveSlotName);
  saveSlotsData["saveSlotIDs"].push("saveSlotName"+saveSlotsOptionsLength);
  window.localStorage.setItem("saveSlotsData", JSON.stringify(saveSlotsData));

  saveSlotsPost = {
    "userName": window.localStorage.getItem("username"),
    "password": window.localStorage.getItem("password"),
    "heroSubID": saveSlotsOptionsLength,
    "heroName": saveSlotName,
  }
  var url = window.location.origin+"/addHero"
  postRequest(saveSlotsPost, url);
}
function removeSaveSlot(){
  var saveSlotChosen = document.querySelector(".saveSlots>option:checked");
  var IDsaveSlotChosen = saveSlotChosen.getAttribute("id");
  saveSlotChosen.parentNode.selectedIndex = 0;
  saveSlotChosen.parentNode.removeChild(saveSlotChosen);
  window.localStorage.removeItem(IDsaveSlotChosen+" PowerTags");
  window.localStorage.removeItem(IDsaveSlotChosen+" WeaknessTags");
  window.localStorage.removeItem(IDsaveSlotChosen+" themeTypeIndicators");
  window.localStorage.removeItem(IDsaveSlotChosen+" checkedThemeTypeIds");
  window.localStorage.removeItem(IDsaveSlotChosen+" titleText");
  window.localStorage.removeItem(IDsaveSlotChosen+" textBoxText");
  window.localStorage.removeItem(IDsaveSlotChosen+" Checkboxes");

  saveSlotChosenIntID = parseInt(saveSlotChosen.getAttribute("id").replace("saveSlotName"));
  saveSlotsString = window.localStorage.getItem("saveSlotsData");
  saveSlotsData = JSON.parse(saveSlotsString);
  saveSlotsData["saveSlotNames"].splice(saveSlotChosenIntID, 1);
  saveSlotsData["saveSlotIDs"].splice(saveSlotChosenIntID, 1);
  window.localStorage.setItem("saveSlotsData", JSON.stringify(saveSlotsData));
}

function postRequest(data, url) {
  console.log("posted");
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
async function loadSaveSlots(){
  saveSlotsString = window.localStorage.getItem("saveSlotsData");
  if(saveSlotsString==null){
    heroNavPost = {
      "userName": window.localStorage.getItem("username"),
      "password": window.localStorage.getItem("password"),
    };
    var url = window.location.origin+"/loadHero";
    var saveSlotsData = await postRequest(heroNavPost, url);
    window.localStorage.getItem("saveSlotsData", saveSlotsData);
  }
  else{ saveSlotsData = JSON.parse(saveSlotsString); }
  saveSlotNameInput = document.querySelector(".saveSlotName");
  saveSlotNames = saveSlotsData["saveSlotNames"];
  saveSlotIDs = saveSlotsData["saveSlotIDs"];
  originalValue = saveSlotNameInput.value;
  for (var i = 0; i < saveSlotNames.length; i++){
    var saveSlotName = saveSlotNames[i];
    var saveSlotID = saveSlotIDs[i]
    var saveSlots = document.querySelector(".saveSlots");
    var newSlotOption = document.createElement("option")
    newSlotOption.setAttribute("id", saveSlotID);
    newSlotOption.innerHTML = saveSlotName;
    saveSlots.appendChild(newSlotOption);
  }
}
loadSaveSlots();
