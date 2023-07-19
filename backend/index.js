//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var express = require('express'); var bodyParser = require('body-parser');
var process = require('process');
var path = require('path');
var pg = require('pg');
const { json } = require('body-parser');

const app = express(); const port = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Frontend')));

app.get('/js/themes.js', async(req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/js/themes.js'));});
app.get('/js/slots.js', async(req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/js/slots.js'));});
app.get('/js/themesDataSL.js', async(req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/js/themesDataSL.js'));});
app.get('/js/tricks.js', async(req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/js/tricks.js'));});
app.get('/themes.css', async(req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/themes.css'));});
app.get('/manifest.json', async(req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/manifest.json'));});
app.get('/icon.png', async(req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/icon.png'));});
app.get('/serviceWorker.js', async(req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/serviceWorker.js'));});
app.get('/js/fetchPost.js', async(req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/js/fetchPost.js'));});

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'anri1551',
});
pool.connect();

app.get('/', async(req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/themes.html'));
});

app.post('/storeUserName', async (req, res) => {
  var themeData = req.body;
  userName = themeData['userName']
  var SQLTextQuery = `INSERT INTO cityofmist.t_user (user_name, password) VALUES ($1, $2);`;
  var result = await pool.query(SQLTextQuery, [userName, "password"]);
  if(err){ return res.status(500).json({ "error": 'failed to add user into the database' }); }
  else{ return res.status(200).json({ "success": 'New user added successfully' }); }
});

async function getUserID(userName, password){
  return new Promise((resolve, reject) => {
    var SQLTextQuery = `SELECT id FROM cityofmist.t_user WHERE user_name=$1 and password=$2;`;
    pool.query(SQLTextQuery, [userName, password], (err, rows, fields) => {
      if(err) { reject(err); return; }
      resolve(rows.rows);
    });
  });
}
app.post('/loadUser', async(req, res) => {
  var themeData = req.body;
  var userName = themeData["userName"];
  var password = themeData["password"];
  var result = await getUserID(userName, password);
  return res.send(result);
});

async function getHeroID(userID, heroSubID){
  return new Promise((resolve, reject) => {
    var SQLTextQuery = `SELECT id FROM cityofmist.hero WHERE user_hero_subid=$1 and user_id=$2;`;
    pool.query(SQLTextQuery, [heroSubID, userID], (err, rows, fields) => {
      if(err) { reject(err); return; }
      resolve(rows.rows);
    });
  });
}
app.post('/loadHero', async(req, res) => {
  var themeData = req.body;
  var userName = themeData["userName"];
  var password = themeData["password"];
  var heroSubID = themeData["heroSubID"];
  var userID = await getUserID(userName, password);
  var heroID = await getHeroID(userID, heroSubID);
  return res.send(heroID);
});

async function addHero(userID, heroName, heroSubID){
  return new Promise((resolve, reject) => {
    var SQLTextQuery = `INSERT INTO cityofmist.hero (user_id, hero_name, user_hero_subid) VALUES ($1, $2, $3);`;
    pool.query(SQLTextQuery, [userID, heroName, heroSubID], (err, rows, fields) => {
      if(err) { reject(err); return; }
      resolve(rows.rows);
    });
  });
}
app.post('/addHero', async(req, res) => {
  var themeData = req.body;
  var userName  = themeData["userName"];
  var password  = themeData["password"];
  var heroSubID = themeData["heroSubID"];
  var heroName  = themeData["heroName"];
  var userID = await getUserID(userName, password);
  await addHero(userID, heroName, heroSubID);

  return res.send(heroID);
});

async function getThemeID(heroID){
  return new Promise((resolve, reject) => {
    var SQLTextQuery = `SELECT id FROM cityofmist.theme WHERE hero_id=$1 LIMIT 4;`;
    pool.query(SQLTextQuery, [heroID], (err, rows, fields) => {
      if(err) { reject(err); return; }
      resolve(rows.rows);
    });
  });
}
async function getTags(themeID){
  themePowTags = { "questionLetter": [], "text": [], "burned": [], }
  themeWekTags = { "questionLetter": [], "text": [], "burned": [], }
  return new Promise((resolve, reject) => {
    var SQLTextQuery = `SELECT * FROM cityofmist.tag WHERE theme_id=$1;`;
    console.log(themeID);
    pool.query(SQLTextQuery, [themeID], (err, rows, fields) => {
      for (var k = 0; k < rows.rows.length; k++) {
        if(rows.rows[k]["tag_type"]==0){
          themePowTags["questionLetter"].push(rows.rows[k]["letter"]);
          themePowTags["text"]          .push(rows.rows[k]["tag_name"]);
          themePowTags["burned"]        .push(rows.rows[k]["burned"]);
        }
        else if(rows.rows[k]["tag_type"]==1){
          themeWekTags["questionLetter"].push(rows.rows[k]["letter"]);
          themeWekTags["text"]          .push(rows.rows[k]["tag_name"]);
          themeWekTags["burned"]        .push(rows.rows[k]["burned"]);
        }
        if((k+1)==rows.rows.length){ resolve([themePowTags, themeWekTags]); }
      }
    });
  });
}
async function getAllTags(themeIDs){
  var allPowerTags    = { "id1": null, "id2": null, "id3": null, "id4": null, };
  var allWeaknessTags = { "id1": null, "id2": null, "id3": null, "id4": null, };
  return new Promise(async(resolve, reject) => {
    for (var i=0; i<themeIDs.length; i++){
      if((i+1)==themeIDs.length){
        [allPowerTags["id"+(i+1)], allWeaknessTags["id"+(i+1)]] = await getTags(themeIDs[i]["id"]);
        console.log("jojo")
        resolve([allPowerTags, allWeaknessTags]);
        reject("error");
      }
      else{
        [allPowerTags["id"+(i+1)], allWeaknessTags["id"+(i+1)]] = await getTags(themeIDs[i]["id"]);
      }
    }
  });
}
app.post('/loadTheme', async(req, res) => {
  // { "userName": "public", "password": "password", "heroSubID": "Bob" }
  var themeData = req.body;
  userName = themeData["userName"];
  password = themeData["password"];
  heroSubID = themeData["heroSubID"];
  var userID = await getUserID(userName, password);
  var heroID = await getHeroID(userID[0]["id"], heroSubID);
  var themeIDs = await getThemeID(heroID[0]["id"]);

  themeTypeJson = { "a": [] };
  logosMythosJson = { "a": [] };
  titleTextJson={ "title": [] };
  textBoxTextJson={ "textBox": [] };
  CheckboxesJson = {
    "theme1": { "attention": [], "fade": [], },
    "theme2": { "attention": [], "fade": [], },
    "theme3": { "attention": [], "fade": [], },
    "theme4": { "attention": [], "fade": [], }
  };
  var SQLTextQuery = `SELECT * FROM cityofmist.theme WHERE hero_id=$1;`;
  pool.query(SQLTextQuery, [heroID[0]["id"]], async(err, rows, fields) => {
    if(err){ return res.status(500).json({ "error": err }); }
    else{
      for(var i=0; i<rows.rows.length; i++){
        var themeType = rows.rows[i]["theme_type"];
        themeTypeJson["a"].push(themeType);
        var logosMythos = rows.rows[i]["logos_mythos"];
        logosMythosJson["a"].push(logosMythos);
        var titleText = rows.rows[i]["theme_title"];
        titleTextJson["title"].push(titleText);
        var textBoxText = rows.rows[i]["mystery"];
        textBoxTextJson["textBox"].push(textBoxText);
        var Attention = rows.rows[i]["attention"];
        var Fade = rows.rows[i]["fade"];
        for (var k = 0; k < 3; k++){
          CheckboxesJson["theme"+(i+1)]["attention"].push(
            JSON.parse(Attention.replace("{", '{"c":[').replace("}", "]}"))["c"][k]
          );
          CheckboxesJson["theme"+(i+1)]["fade"].push(
            JSON.parse(Fade.replace("{", '{"c":[').replace("}", "]}"))["c"][k]
          );   
        }
      }
    }
    var allPowerTags = undefined; var allWeaknessTags = undefined;
    [allPowerTags, allWeaknessTags] = await getAllTags(themeIDs);
    postedData = {
      "ThemeType": [themeTypeJson["a"], logosMythosJson["a"]],
      "TextData": [titleTextJson["title"], textBoxTextJson["textBox"]],
      "Checkboxes": CheckboxesJson,
      "TagData": [allPowerTags, allWeaknessTags],
    };
    return res.send(postedData);
  });
});

async function addTags(themeID){
  
}
async function addTheme(
  LogosMythos1, Type1, Attention1, Fade1, heroID, Title1, Mystery1,
  LogosMythos2, Type2, Attention2, Fade2, Title2, Mystery2,
  LogosMythos3, Type3, Attention3, Fade3, Title3, Mystery3,
  LogosMythos4, Type4, Attention4, Fade4, Title4, Mystery4,
  tagData
  ){
    tagData = [
      {
        id1: { questionLetter: ['A','A','A','A'], text: ["p1","p2","p3","p4"], burned: [1,0,0,1] },
        id2: { questionLetter: ['A','A','A'],     text: ["p5","p6","p7"],      burned: [1,0,0] },
        id3: { questionLetter: ['A','A'],         text: ["p8","p9"],           burned: [1,0] },
        id4: { questionLetter: ['A','A','A'],     text: ["p10","p11","p12"],      burned: [1,0,0] }
      },
      {
        id1: { questionLetter: [], text: [], burned: [] },
        id2: { questionLetter: [], text: [], burned: [] },
        id3: { questionLetter: [], text: [], burned: [] },
        id4: { questionLetter: [], text: [], burned: [] }
      }
    ]
    return new Promise(async(resolve, reject) => {
    var themeQuerryDone = 0; var tagQuerryDone = 0;
    var SQLTextQuery = 
    `CALL cityofmist."sp_addTheme"(
      $1,   $2,   $3,   $4,   $5,   $6,   $7,   $8,   $9,   $10,  $11,  $12,
      $13,  $14,  $15,  $16,  $17,  $18,  $19,  $20,  $21,  $22,  $23,  $24,
      $25,  $26,  $27,  $28,  $29,  $30,  $31,  $32,  $33,  $34,  $35,  $36,
      $37,  $38,  $39,  $40,  $41,  
      $42,  $43,  $44,  $45,
      $46,  $47,  $48,  $49,
      $50,  $51,  $52,  $53,
      $54,  $55,  $56,  $57
    );`
    await pool.query(SQLTextQuery, 
      [
        LogosMythos1,LogosMythos2,LogosMythos3,LogosMythos4, Type1, Type2, Type3, Type4, 
        (Attention1[0]+0), (Attention1[1]+0), (Attention1[2]+0), 
        (Attention2[0]+0), (Attention2[1]+0), (Attention2[2]+0), 
        (Attention3[0]+0), (Attention3[1]+0), (Attention3[2]+0), 
        (Attention4[0]+0), (Attention4[1]+0), (Attention4[2]+0), 
        (Fade1[0]+0), (Fade1[1]+0), (Fade1[2]+0), (Fade2[0]+0), (Fade2[1]+0), (Fade2[2]+0), 
        (Fade3[0]+0), (Fade3[1]+0), (Fade3[2]+0), (Fade4[0]+0), (Fade4[1]+0), (Fade4[2]+0), 
        heroID, Title1, Title2, Title3, Title4, Mystery1, Mystery2, Mystery3, Mystery4,
        tagData[0]["id"+1]["text"].length, tagData[0]["id"+1]["burned"], tagData[0]["id"+1]["text"], tagData[0]["id"+1]["questionLetter"],
        tagData[0]["id"+2]["text"].length, tagData[0]["id"+2]["burned"], tagData[0]["id"+2]["text"], tagData[0]["id"+2]["questionLetter"],
        tagData[0]["id"+3]["text"].length, tagData[0]["id"+3]["burned"], tagData[0]["id"+3]["text"], tagData[0]["id"+3]["questionLetter"],
        tagData[0]["id"+4]["text"].length, tagData[0]["id"+4]["burned"], tagData[0]["id"+4]["text"], tagData[0]["id"+4]["questionLetter"]
      ],
      (err, rows, fields) => {
        console.log(err)
        if(err){ reject({ "error": err }); return; }
        else{ themeQuerryDone=1; }
      }
    );

    if(tagQuerryDone && themeQuerryDone){
      resolve({ "success": "new Theme added" });
    }
  });
}
async function updateTheme(
  LogosMythos1, Type1, Attention1, Fade1, Title1, Mystery1, themeID1,
  LogosMythos2, Type2, Attention2, Fade2, Title2, Mystery2, themeID2,
  LogosMythos3, Type3, Attention3, Fade3, Title3, Mystery3, themeID3,
  LogosMythos4, Type4, Attention4, Fade4, Title4, Mystery4, themeID4
  ){
  return new Promise((resolve, reject) => {
    var SQLTextQuery = 
    `CALL cityofmist."sp_updateTheme"(
      $1,   $2,   $3,   $4,   $5,   $6,   $7,   $8,   $9,   $10,  $11,  $12,
      $13,  $14,  $15,  $16,  $17,  $18,  $19,  $20,  $21,  $22,  $23,  $24,
      $25,  $26,  $27,  $28,  $29,  $30,  $31,  $32,  $33,  $34,  $35,  $36,
      $37,  $38,  $39,  $40,  $41,  $42,  $43,  $44
    );`
    pool.query(SQLTextQuery, 
      [
        LogosMythos1,LogosMythos2,LogosMythos3,LogosMythos4, Type1, Type2, Type3, Type4, 
        (Attention1[0]+0), (Attention1[1]+0), (Attention1[2]+0), 
        (Attention2[0]+0), (Attention2[1]+0), (Attention2[2]+0), 
        (Attention3[0]+0), (Attention3[1]+0), (Attention3[2]+0), 
        (Attention4[0]+0), (Attention4[1]+0), (Attention4[2]+0), 
        (Fade1[0]+0), (Fade1[1]+0), (Fade1[2]+0), (Fade2[0]+0), (Fade2[1]+0), (Fade2[2]+0), 
        (Fade3[0]+0), (Fade3[1]+0), (Fade3[2]+0), (Fade4[0]+0), (Fade4[1]+0), (Fade4[2]+0), 
        Title1, Title2, Title3, Title4, Mystery1, Mystery2, Mystery3, Mystery4,
        themeID1, themeID2, themeID3, themeID4
      ], (err, rows, fields) => {
        console.log(err);
        if(err){ reject({ "error": err }); return; }
        else{ resolve({ "success": "new Theme added" }); }
      });
  });
}
function areThemesDefined(heroID){
  return new Promise((resolve, reject) => {
    var SQLTextQuery = 
    `SELECT COUNT(*) as count FROM cityofmist.theme WHERE hero_id = $1;`
    pool.query(SQLTextQuery, [heroID], (err, rows, fields) => {
      console.log(err);
      if(err){ reject({ "error": err }); return; }
      else{
        if( parseInt(rows.rows[0]["count"])>=4){ resolve(1); }
        else{ resolve(0); }
      }
    });
  });
}
app.post('/saveThemes', async(req, res) => {
  var themeData = req.body["themeData"];
  var navData = req.body["navData"];
  var userName = navData["userName"];
  var password = navData["password"];
  var heroSubID = navData["heroSubID"];
  var userID = await getUserID(userName, password);
  userID = userID[0]["id"];
  var heroID = await getHeroID(userID, heroSubID);
  heroID = heroID[0]["id"];

  LogosMythos1 = themeData["ThemeType"][1][0];
  LogosMythos2 = themeData["ThemeType"][1][1];
  LogosMythos3 = themeData["ThemeType"][1][2];
  LogosMythos4 = themeData["ThemeType"][1][3];
  Type1 = themeData["ThemeType"][0][0];
  Type2 = themeData["ThemeType"][0][1];
  Type3 = themeData["ThemeType"][0][2];
  Type4 = themeData["ThemeType"][0][3];
  Title1 = themeData["TextData"][0][0];
  Title2 = themeData["TextData"][0][1];
  Title3 = themeData["TextData"][0][2];
  Title4 = themeData["TextData"][0][3];
  Mystery1 = themeData["TextData"][1][0];
  Mystery2 = themeData["TextData"][1][1];
  Mystery3 = themeData["TextData"][1][2];
  Mystery4 = themeData["TextData"][1][3];
  AttentionFade = themeData["Checkboxes"];
  Attention1 = AttentionFade["theme"+1]["attention"];
  Attention2 = AttentionFade["theme"+2]["attention"];
  Attention3 = AttentionFade["theme"+3]["attention"];
  Attention4 = AttentionFade["theme"+4]["attention"];
  Fade1 = AttentionFade["theme"+1]["fade"];
  Fade2 = AttentionFade["theme"+2]["fade"];
  Fade3 = AttentionFade["theme"+3]["fade"];
  Fade4 = AttentionFade["theme"+4]["fade"];
  tagData = themeData["TagData"];
  console.log(tagData);

  var themesDefined = await areThemesDefined(heroID);
  if(!themesDefined){
    await addTheme(
      LogosMythos1, Type1, Attention1, Fade1, heroID, Title1, Mystery1,
      LogosMythos2, Type2, Attention2, Fade2, Title2, Mystery2,
      LogosMythos3, Type3, Attention3, Fade3, Title3, Mystery3,
      LogosMythos4, Type4, Attention4, Fade4, Title4, Mystery4,
      tagData
    );
    res.send("theme Added");
  }
  else{
    var themeIDs = await getThemeID(heroID);
    themeID1 = themeIDs[0]["id"];
    themeID2 = themeIDs[1]["id"];
    themeID3 = themeIDs[2]["id"];
    themeID4 = themeIDs[3]["id"];
    await updateTheme(
      LogosMythos1, Type1, Attention1, Fade1, Title1, Mystery1, themeID1,
      LogosMythos2, Type2, Attention2, Fade2, Title2, Mystery2, themeID2,
      LogosMythos3, Type3, Attention3, Fade3, Title3, Mystery3, themeID3,
      LogosMythos4, Type4, Attention4, Fade4, Title4, Mystery4, themeID4
    );
    res.send("theme Updated");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
