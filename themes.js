function newPlusDiv(thePlusDiv, initLetter){
  if(thePlusDiv.innerText=="+"){
    LocalParent = thePlusDiv.parentNode;
    PowerTagCommonDiv = document.createElement("div");
    PowerTagCommonDiv.setAttribute("class", "PowerTagCommon")

    questionLetter = document.createElement("select");
    questionLetter.setAttribute("class", "questionLetter");
    parentTheme = thePlusDiv.parentNode.parentNode.parentNode;
    selectedOption_ID = parentTheme.querySelector(".TypeTextBox>option:checked").getAttribute("id");
    console.log(selectedOption_ID);
    questionLetter.innerHTML = `
      <option id="option0">A</option>
      <option id="option1">B</option>
      <option id="option2">C</option>
      <option id="option3">D</option>
      <option id="option4">E</option>
      <option id="option5">F</option>
      <option id="option6">G</option>
      <option id="option7">H</option>
      <option id="option8">I</option>
      <option id="option9">J</option>`;
    allOptionsInQuestionLetter = questionLetter.querySelectorAll("option");
    allOptionsInQuestionLetter.forEach(option => {
      if(option.innerText==initLetter){ 
        option.setAttribute("selected", true);
        LocalParent.parentNode.parentNode.focus();
      }
    });

    PowerTagCommonDiv.appendChild(questionLetter);

    LocalParent.removeChild(thePlusDiv);
    thePlusDiv.removeAttribute("onfocus");
    thePlusDiv.removeAttribute("PlusDiv");
    thePlusDiv.innerText = "";
    thePlusDiv.setAttribute("class","powerTag");
    thePlusDiv.setAttribute("onfocusout","deleteThisDiv(this)");
    PowerTagCommonDiv.appendChild(thePlusDiv);

    burnTag=document.createElement("input");
    burnTag.setAttribute("class", "burnTag");
    burnTag.setAttribute("type", "checkbox");
    LocalParent.appendChild(burnTag);
    PowerTagCommonDiv.appendChild(burnTag);

    LocalParent.appendChild(PowerTagCommonDiv);

    aNewPlusDiv = document.createElement("div");
    aNewPlusDiv.setAttribute("class", "TextBox PlusDiv");
    aNewPlusDiv.setAttribute("contenteditable", "true");
    aNewPlusDiv.setAttribute("onfocus",  "newPlusDiv(this)");
    aNewPlusDiv.innerText = "+";
    LocalParent.appendChild(aNewPlusDiv);
  }
}
function deleteThisDiv(ThisDiv){
  if(ThisDiv.innerText.trim() === ''){ThisDiv.parentNode.parentNode.removeChild(ThisDiv.parentNode);}
}

function ChangeThemeML(elem){
  parentTheme = elem.parentNode.parentNode;
  if(parentTheme.getAttribute("class")=="theme mythos"){
    elem.innerText = "_Logos_";
    parentTheme.setAttribute("class", "theme logos");
    elem.parentNode.querySelector(".TypeTextBox").innerHTML=`
      <option id="option10">THEME TYPE</option>
      <option id="option11">DEFINING EVENT</option>
      <option id="option12">DEFINING RELATIONSHIP</option>
      <option id="option13">MISSION</option>
      <option id="option14">PERSONALITY</option>
      <option id="option15">POSSESSIONS</option>
      <option id="option16">ROUTINE</option>
      <option id="option17">TRAINING</option>`;
  }
  else if(parentTheme.getAttribute("class")=="theme logos"){
    elem.innerText = "_Mythos_";
    parentTheme.setAttribute("class", "theme mythos");
    elem.parentNode.querySelector(".TypeTextBox").innerHTML=`
      <option id="option20">THEME TYPE</option>
      <option id="option21">ADAPTATION</option>
      <option id="option22">BASTION</option>
      <option id="option23">DIVINATION</option>
      <option id="option24">EXPRESSION</option>
      <option id="option25">MOBILITY</option>
      <option id="option26">RELIC</option>
      <option id="option27">SUBVERSION</option>`
  }
}

mythosThemesTypeText = document.querySelectorAll(".mythos>.Type>.TypeTextBox");
logosThemesTypeText  = document.querySelectorAll(".logos>.Type>.TypeTextBox" );
logosThemesTypeText.forEach(TextBox => {
  TextBox.innerHTML = `
    <option id="option10">THEME TYPE</option>
    <option id="option11">DEFINING EVENT</option>
    <option id="option12">DEFINING RELATIONSHIP</option>
    <option id="option13">MISSION</option>
    <option id="option14">PERSONALITY</option>
    <option id="option15">POSSESSIONS</option>
    <option id="option16">ROUTINE</option>
    <option id="option17">TRAINING</option>`;
});
mythosThemesTypeText.forEach(TextBox => {
  TextBox.innerHTML = `
    <option id="option20">THEME TYPE</option>
    <option id="option21">ADAPTATION</option>
    <option id="option22">BASTION</option>
    <option id="option23">DIVINATION</option>
    <option id="option24">EXPRESSION</option>
    <option id="option25">MOBILITY</option>
    <option id="option26">RELIC</option>
    <option id="option27">SUBVERSION</option>`
});

function displayQuestions(){
  powerTagQuestionContainerList = document.querySelectorAll(".tagQuestionContainer>div>.PowerQuestions");
  weaknessTagQuestionContainerList = document.querySelectorAll(".tagQuestionContainer>div>.WeaknessQuestions");
  selectedThemeTypeList = document.querySelectorAll(".theme>.Type>.TypeTextBox>option:checked");//program flow for logos next.

  for(var i=0; i<selectedThemeTypeList.length; i++){
    IdOfSelectedThemeTypes = parseInt(selectedThemeTypeList[i].getAttribute("id").replace("option",""));
    questionsContainerText = ""
    switch(IdOfSelectedThemeTypes){
      case 24:
        questionsContainerText=`
          <p class="questionParaq">Expression</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="A" >A) A way to affect the world.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="B" >B) A way to create the reverse affect.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="C" >C) A quality of the main affect.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="D" >D) Condition of enhancement.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="E" >E) Condition (special target) of enhancement.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="F" >F) Mastery of a sub-affect.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="G" >G) An affect not related to main affect.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="H" >H) Special Maneuver/Trick.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="I" >I) Your attitude when you use expression.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="J" >J) A way to protect from similar effects.</p>`
        break;
      case 25:
        questionsContainerText=`
          <p class="questionParaq">Mobility</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="A" >A) Your most useful movement form.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="B" >B) Power to go to overdrive.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="C" >C) Power to avoid restraints.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="D" >D) Secondary type of movement.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="E" >E) Movement technique you have mastered.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="F" >F) Specific harmful affect your mobility allows you to avoid.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="G" >G) A use of mobility to gain advantage in a fight.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="H" >H) A way to move others.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="I" >I) A way to restraining others' movements.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="J" >J) Special resource mobility gives you access to.</p>`
        break;
      case 26:
        questionsContainerText=`
          <p class="questionParaq">Relic</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="A" >A) The main feature or part of your relic.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="B" >B) Another way you use the same feature.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="C" >C) Core characteristic of your relic.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="D" >D) Cosmetic attribute of your relic.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="E" >E) Another feature, part, item of your relic.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="F" >F) A way your relic to reveals information to you.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="G" >G) Special target your relic designated to affect.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="H" >H) A power you have learned from your relic.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="I" >I) Affect of relic when it goes into overdrive.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="J" >J) A power of your relic you are beginning to unlock.</p>`
        break;
      case 21:
        questionsContainerText=`
          <p class="questionParaq">Adaptation</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="A" >A) A versatile power.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="B" >B) A subgroup of powers you have mastered.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="C" >C) Your favorite use of your power.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="D" >D) Conditions of enhancement of your versatile power.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="E" >E) Problem which you have quick solution for.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="F" >F) An affect your powers protect you from.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="G" >G) Emotion, attitude fueling your powers.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="H" >H) Specific type of thing you can summon.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="I" >I) Strategy, combo you use in battle.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="J" >J) A way to enhance or weaken others powers.</p>`
        break;
      case 22:
        questionsContainerText=`
          <p class="questionParaq">Bastion</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="A" >A) An ability that most often protects you.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="B" >B) Way to extend protection to others.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="C" >C) Useful quality of your protective ability.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="D" >D) Trait that protects you against a type of affect.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="E" >E) Way to use your ability offencively.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="F" >F) Secondary defensive power of your main ability.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="G" >G) Any secondary power of your main ability.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="H" >H) A target you protect especially effectively.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="I" >I) A way of using your ability when you are in a clinch.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="J" >J) A tactic you employ when you use your ability.</p>`
        break;
      case 23:
        questionsContainerText=`
          <p class="questionParaq">Divination</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="A" >A) Power to know things you wouldn't otherwise know.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="B" >B) Another type of knowledge you can access.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="C" >C) Subject easiest for you to learn about.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="D" >D) Item or substance that act as conduit of your power.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="E" >E) A quality of your divination making it especially effective.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="F" >F) Advantage in fight your divination gives you.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="G" >G) Way your senses have been enhanced.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="H" >H) Creative use of your divination you developed.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="I" >I) Way to affect others with your power.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="J" >J) Frontier of knowledge at the edge of your divination.</p>`
        break;
      case 27:
        questionsContainerText=`
          <p class="questionParaq">Subversion</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="A" >A) Power to hide or mask your actions.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="B" >B) Way to distract others.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="C" >C) Quality of your main power.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="D" >D) What do you do best under cover.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="E" >E) Easiest target for your subversion.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="F" >F) Way to learn information using your secracy.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="G" >G) Member of your league.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="H" >H) Affect you are likely to be unaffected by.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="I" >I) Conditions of undetectibility enchancement.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="J" >J) Another related subversive power you developed.</p>`
        break;

      case 11:
        questionsContainerText=`
          <p class="questionParaq">Defining event</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="A" >A) Strong emotion your defining event left you with.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="B" >B) Part of your old self, that deeply changed but still serves you.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="C" >C) Mundane object did you obtain during your defining event, that has been with you ever since.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="D" >D) Authority that was vested in you during your defining event or after it.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="E" >E) Someone you connected with in the aftermath of your defining event.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="F" >F) Mundane ability you picked up during or due to your defining event.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="G" >G) Knowledge you gained access to thanks to your defining event.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="H" >H) Approach to life you adopted following your defining event.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="I" >I) Physical change or improvement that stemmed from your defining event.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="J" >J) People's treatment of you because of your defining event.</p>`
        break;
      case 12:
        questionsContainerText=`
          <p class="questionParaq">Defining relationship</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="A" >A) Reason this relationship is important for you?</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="B" >B) Quality or skill that they have and which they can use to help you.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="C" >C) Something you were forced to learn because of this relationship?</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="D" >D) Quality you gained by being around them.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="E" >E) Someone who will help when you call for help.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="F" >F) Gift, heritage, tool, etc. they gave you.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="G" >G) How should you be to deal with them.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="H" >H) Activity you share.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="I" >I) Something that helps you protect them.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="J" >J) Place where you spend time together?</p>`
        break;
      case 13:
        questionsContainerText=`
          <p class="questionParaq">Mission</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="A" >A) Something you need most to realize your mission.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="B" >B) Something you were forced to learn during your mission.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="C" >C) Someone who helps you in your mission.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="D" >D) Knowledge you have about the target or purpose of your mission.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="E" >E) Tactics or methods you use to achieve your goal.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="F" >F) Quality you gained by pursuing your mission.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="G" >G) The root of your commitment in the mission.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="H" >H) Position or status you had to earn for the mission to succeed.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="I" >I) Something you have that could help you in your mission.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="J" >J) Part of your plan to realize your goal you have perfected.</p>`
        break;
      case 14:
        questionsContainerText=`
          <p class="questionParaq">Personality</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="A" >A) Core of your personality.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="B" >B) First thing people notice about you.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="C" >C) Interpersonal skills you have.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="D" >D) Quality you can assume when you want.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="E" >E) Skill or special status you have.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="F" >F) Aspect of your personality that keeps you safe or helps you resist influences.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="G" >G) Quality or item that best expresses your personal style or enhances it.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="H" >H) Habit or routine you have grown.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="I" >I) Something you are generally interested in.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="J" >J) Way you strive to improve yourself.</p>`
        break;
      case 15:
        questionsContainerText=`
          <p class="questionParaq">Possessions</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="A" >A) Most important thing in your possession.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="B" >B) General way to describe your property.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="C" >C) Another important item in your possession.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="D" >D) Component or accessory added to any of your items that may change or improve its function.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="E" >E) Stunts or movements you generally do with your belongings.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="F" >F) Something that helps you hide your possession or the fact that you use them.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="G" >G) Something that keeps your possession safe.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="H" >H) Way you you handle, repair or take care of your possession.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="I" >I) Quality your possession has.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="J" >J) Item that completes a set with your other power tags.</p>`
        break;
      case 16:
        questionsContainerText=`
          <p class="questionParaq">Routine</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="A" >A) Way you spend your time.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="B" >B) Privileges that accompany the territory of what you do.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="C" >C) Tools you use.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="D" >D) Someone who usually helps you.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="E" >E) Something you learned during your daily activities.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="F" >F) Specific activity you do as a part of your main profession.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="G" >G) Trick you picked up doing what you do.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="H" >H) Quality you have because of your routine.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="I" >I) Place where you do your routine, or place where you go to escape it.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="J" >J) Something that brings you to the same place every day.</p>`
        break;
      case 17:
        questionsContainerText=`
          <p class="questionParaq">Training</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="A" >A) Something you do or know, best.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="B" >B) Field of expertise, specific skill or subject you excel at.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="C" >C) Another tangent field you ventured into indirectly?</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="D" >D) Movement, method, maneuver, habit or tip you learned during your coaching?</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="E" >E) Quality or character your training has fostered?</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="F" >F) Teacher, trainer or trainee you can count on for help in this domain.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="G" >G) Equipment related to your training you normally have access to.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="H" >H) Specific target your training gives the best results against?</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="I" >I) Conditions under which your technique works best.</p>
          <p class="questionParaq" onclick="letteredQuestionAnswered(this, `+i+`)" letter="J" >J) Unusual new application of your training you are exploring.</p>`
        break;
    }
    powerTagQuestionContainerList[i].innerHTML = questionsContainerText;
  }
  for(var i=0; i<selectedThemeTypeList.length; i++){
    IdOfSelectedThemeTypes = parseInt(selectedThemeTypeList[i].getAttribute("id").replace("option",""));
    questionsContainerText = ""
    switch(IdOfSelectedThemeTypes){
      case 24:
        questionsContainerText=`
          <p class="questionParaq">Expression</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="A" >A) In what situations or conditions weaken or delete the expression of your myth?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="B" >B) Which targets are immune or resistant in the expression of your myth?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="C" >C) What happens when you lose control on expressing your myth?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="D" >D) What are the impacts of the introduction of your myths in the world?</p>`
        break;
      case 25:
        questionsContainerText=`
          <p class="questionParaq">Mobility</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="A" >A) What hinders or slows you down?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="B" >B) What happens when you go too fast, too far, etc.?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="C" >C) What happens when you are caught?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="D" >D) What residual evidence does your movement leaves on you, on others or in the environment?</p>`
        break;
      case 26:
        questionsContainerText=`
          <p class="questionParaq">Relic</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="A" >A) What is the most troublesome defect of your relic?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="B" >B) What can interfere with powers of your relic?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="C" >C) What can damage or destroy your relic?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="D" >D) What has changed for worst in you because of your relic?</p>`
        break;
      case 21:
        questionsContainerText=`
          <p class="questionParaq">Adaptation</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="A" >A) What do your powers depend on?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="B" >B) Which results are the most difficult to reaching?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="C" >C) What hinders your myth or limits its possibilities?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="D" >D) What bad habits have you got due to your powers of adaptation?</p>`
        break;
      case 22:
        questionsContainerText=`
          <p class="questionParaq">Bastion</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="A" >A) How your defencive powers affect your appearance?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="B" >B) What are the unwanted implications of your defence?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="C" >C) What attack is your defence suseptable to?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="D" >D) What personality traint derived from your defence gets into trouble?</p>`
        break;
      case 23:
        questionsContainerText=`
          <p class="questionParaq">Divination</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="A" >A) What happens when your divination overwhelms you?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="B" >B) What can hinder or block your divination?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="C" >C) What is beyond the reach of your divination?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="D" >D) What do you need to use your divination?</p>`
        break;
      case 27:
        questionsContainerText=`
          <p class="questionParaq">Subversion</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="A" >A) What might expose you to?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="B" >B) What reveals when you are exposed ?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="C" >C) Who or what are you hiding from?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="D" >D) What psychological tendencies unfavorable have you developed in the shadow or behind your mask?</p>`
        break;

      case 11://Left here...
        questionsContainerText=`
          <p class="questionParaq">Defining event</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="A" >A) What emotional scar or baggage does your defining event did it left you?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="B" >B) Following your determining event, what responsibilities or charges social response?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="C" >C) Who or what haunts you because of your defining event?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="D" >D) What is now broken within you, physically or mentally, due to your event determining ?</p>`
        break;
      case 12:
        questionsContainerText=`
          <p class="questionParaq">Defining relationship</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="A" >A) How can they be hurt or hurt?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="B" >B) What negative effect do they have on you ?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="C" >C) Who or what else awaits them attention or its time?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="D" >D) In what circumstances will they be unable to help you?</p>`
        break;
      case 13:
        questionsContainerText=`
          <p class="questionParaq">Mission</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="A" >A) What are the side effects or charges of the pursuit of the mission?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="B" >B) What are the weak points or wild-cards of your plan?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="C" >C) Which approach or psychological disposition will hindrance your endeavors?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="D" >D) Why have you not succeeded so far?</p>`
        break;
      case 14:
        questionsContainerText=`
          <p class="questionParaq">Personality</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="A" >A) What happens when you leave yourself to go too far?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="B" >B) What kinds of people or conditions make your personality less effective?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="C" >C) What aspects of your appearance, your style or your physics can constrain you?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="D" >D) What happens when you are pushed in a corner?</p>`
        break;
      case 15:
        questionsContainerText=`
          <p class="questionParaq">Possessions</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="A" >A) What technical or practical defect have your items or possessions?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="B" >B) What bad habits or traits related to your property are you displaying?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="C" >C) What conditions could make your less effective possessions?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="D" >D) Who or what can prevent you to use your goods?</p>`
        break;
      case 16:
        questionsContainerText=`
          <p class="questionParaq">Routine</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="A" >A) At the end of your day, whether you do you stay?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="B" >B) What are the trending limitations or cons of your routine?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="C" >C) Who or what can interfere with your routine?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="D" >D) What happens when you are knocked out of your routine?</p>`
        break;
      case 17:
        questionsContainerText=`
          <p class="questionParaq">Training</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="A" >A) What is the most problematic failure in your technique?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="B" >B) How has your training adequately affected your psyche or your body?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="C" >C) Who is after you because of your importance in the field?</p>
          <p class="questionParaq" onclick="letteredWeaknessQuestionAnswered(this, `+i+`)" letter="D" >D) Name a unique defect to a specific move or method as you described in your power tags.</p>`
        break;
    }
    weaknessTagQuestionContainerList[i].innerHTML = questionsContainerText;
  }
}
displayQuestions();

function letteredQuestionAnswered(letteredQuestion, themeId){
  answeredLetter = letteredQuestion.getAttribute("letter");
  plusDivAbove = document.querySelector(".theme#theme"+(themeId+1)+">.bottomHalfOfBody>.Power>.PlusDiv");
  console.log(plusDivAbove);
  newPlusDiv(plusDivAbove, answeredLetter)
}
function letteredWeaknessQuestionAnswered(letteredQuestion, themeId){
  answeredLetter = letteredQuestion.getAttribute("letter");
  plusDivAbove = document.querySelector(".theme#theme"+(themeId+1)+">.bottomHalfOfBody>.Power>.PlusDiv");
  console.log(plusDivAbove);
  newPlusDiv(plusDivAbove, answeredLetter)
}

function changeThemeType(elem){
  selectedThemeTypeList = document.querySelectorAll(".theme>.Type>.TypeTextBox>option:checked");
}

function resizeTable(){
  elem=document.querySelector(".resizebar");
  myHeight = elem.style.height;
  table = document.querySelector(".resizeme");
  table.style.height = myHeight;
}