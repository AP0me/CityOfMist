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
  // Insert the Blob into the database
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
    console.log(userID, heroSubID);
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
    pool.query(SQLTextQuery, [themeID], (err, rows, fields) => {
      for (var k = 0; k < rows.rows.length; k++) {
        if(rows.rows[k]["tag_type"]==0){
          themePowTags["questionLetter"].push(rows.rows[k]["letter"]);
          themePowTags["text"]          .push(rows.rows[k]["tag_name"]);
          themePowTags["burned"]        .push(rows.rows[k]["burned"]);
        } else
        if(rows.rows[k]["tag_type"]==1){
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
  console.log(heroSubID);
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
        var Checkboxes = rows.rows[i]["attention"];
        CheckboxesJson["theme"+(i+1)]["attention"].push(Checkboxes.replace("{", '{"c":[').replace("}", "]}"));
        var Checkboxes = rows.rows[i]["fade"];
        CheckboxesJson["theme"+(i+1)]["fade"].push(Checkboxes.replace("{", '{"c":[').replace("}", "]}"));
      }
    }
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

function addTheme(LogosMythos, Type, Attention, Fade, heroID, Title, Mystery) {
  return new Promise((resolve, reject) => {
    var SQLTextQuery = 
    `INSERT INTO cityofmist.theme(
     logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery)
     VALUES (CAST($1 AS bit), $2, CAST(ARRAY[$3,$4,$5] AS bit[]), CAST(ARRAY[$6,$7,$8] AS bit[]), $9, $10, $11);`
    pool.query(SQLTextQuery, 
      [LogosMythos, Type, (Attention[0]+0), (Attention[1]+0), (Attention[2]+0), (Fade[0]+0), (Fade[1]+0), (Fade[2]+0), heroID, Title, Mystery], (err, rows, fields) => {
        if(err){ reject({ "error": err }); return; }
        else{ resolve({ "success": "new Theme added" }); }
      });
  });
}
app.post('/createThemes', async(req, res) => {
  var themeData = req.body["themeData"];
  var navData = req.body["navData"];
  var userName = navData["userName"];
  var password = navData["password"];
  var heroSubID = navData["heroSubID"];
  var userID = await getUserID(userName, password);
  userID = userID[0]["id"];
  var heroID = await getHeroID(userID, heroSubID);
  heroID = heroID[0]["id"];

  for (var i=1; i<5; i++){
    LogosMythos = themeData["ThemeType"][1][i-1];
    Type = themeData["ThemeType"][0][i-1];
    Title = themeData["TextData"][0][i-1];
    Mystery = themeData["TextData"][1][i-1];
    AttentionFade = themeData["Checkboxes"];
    Attention = AttentionFade["theme"+i]["attention"];
    Fade = AttentionFade["theme"+i]["fade"];
    statusJSONs = [];
    statusJSON = await addTheme(LogosMythos, Type, Attention, Fade, heroID, Title, Mystery);
    statusJSONs.push(statusJSON);
  }
  res.send(statusJSONs);
});

function updateTheme(LogosMythos, Type, Attention, Fade, heroID, Title, Mystery, themeID){
  return new Promise((resolve, reject) => {
    var SQLTextQuery = 
    `UPDATE cityofmist.theme SET 
    logos_mythos=CAST($1 AS bit), theme_type=$2, attention=CAST(ARRAY[$3,$4,$5] AS bit[]), fade=CAST(ARRAY[$6,$7,$8] AS bit[]), hero_id=$9, theme_title=$10, mystery=$11
    WHERE id = $12;`
    pool.query(SQLTextQuery, 
      [LogosMythos, Type, (Attention[0]+0), (Attention[1]+0), (Attention[2]+0), (Fade[0]+0), (Fade[1]+0), (Fade[2]+0), heroID, Title, Mystery, themeID], (err, rows, fields) => {
        console.log("Theme updated")
        if(err){ reject({ "error": err }); return; }
        else{ resolve({ "success": "Theme updated" }); }
      });
  });
}
app.post('/updateThemes', async(req, res) => {
  var themeData = req.body["themeData"];
  var navData = req.body["navData"];
  var userName = navData["userName"];
  var password = navData["password"];
  var heroSubID = navData["heroSubID"];
  var userID = await getUserID(userName, password);
  userID = userID[0]["id"];
  var heroID = await getHeroID(userID, heroSubID);
  heroID = heroID[0]["id"];
  var themeIDs = await getThemeID(heroID);

  for (var i=1; i<5; i++){
    LogosMythos = themeData["ThemeType"][1][i-1];
    Type = parseInt(themeData["ThemeType"][0][i-1].toString()[1]);
    Title = themeData["TextData"][0][i-1];
    Mystery = themeData["TextData"][1][i-1];
    AttentionFade = themeData["Checkboxes"];
    Attention = AttentionFade["theme"+i]["attention"];
    Fade = AttentionFade["theme"+i]["fade"];
    themeID = themeIDs[i-1]["id"];
    statusJSONs = [];
    statusJSON = await updateTheme(LogosMythos, Type, Attention, Fade, heroID, Title, Mystery, themeID);
    statusJSONs.push(statusJSON);
  }
  res.send(statusJSONs);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
