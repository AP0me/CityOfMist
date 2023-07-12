var express = require('express'); var bodyParser = require('body-parser');
var process = require('process');
var path = require('path');
var pg = require('pg');
const { json } = require('body-parser');

const app = express(); const port = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Frontend')));

app.get('/themes.js', async(req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/themes.js'));});
app.get('/themesDataSL.js', async(req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/themesDataSL.js'));});
app.get('/themes.css', async(req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/themes.css'));});

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'anri1551',
});
pool.connect();

function stringToBlob(strInput) { return Buffer.from(strInput); }
function blobToString(blob) { return blob.toString(); }

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
    console.log(heroSubID);
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
app.post('/createTheme', async(req, res) => {
/*{ 
    "themeData": { "LogosMythos": 0, "Type": 1, "Title": "Title", "AttentionFade": "110100", "Mystery": "Mystery"},
    "navData": { "userName": 0, "password": "password", "heroSubID": "Bob" }
  }*/
  var themeData = req.body["themeData"];
  LogosMythos = themeData["LogosMythos"];
  Type = themeData["Type"];
  Title = themeData["Title"];
  AttentionFade = themeData["AttentionFade"];
  Attention = AttentionFade.slice(0, 3);
  Fade = AttentionFade.slice(3, 6);
  Mystery = themeData["Mystery"];
  var navData = req.body["navData"];
  var userName = navData["userName"];
  var password = navData["password"];
  var heroSubID = navData["heroSubID"];

  var userID = await getUserID(userName, password);
  var heroID = await getHeroID(userID, heroSubID)[0]["id"];
  var SQLTextQuery = 
  `INSERT INTO cityofmist.theme(
   logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery)
   VALUES (CAST($1 AS bit),$2, CAST(ARRAY[$3,$4,$5] AS bit[]), CAST(ARRAY[$6,$7,$8] AS bit[]), $9, $10, $11);`
  pool.query(SQLTextQuery, 
    [LogosMythos, Type, Attention[0], Attention[1], Attention[2], Fade[0], Fade[1], Fade[2], heroID, Title, Mystery], (err, rows, fields) => {
      if(err){ return res.status(500).json({ "error": err }); }
      else{ return res.status(200).json({ "success": 'new Theme added' }); }
    })
});

app.post('/loadTag', async(req, res) => {
  var themeData = req.body;
  var userName = themeData["userName"];
  var password = themeData["password"];
  var heroSubID = themeData["heroSubID"];
  var userID = await getUserID(userName, password);
  var heroID = await getHeroID(userID, heroSubID);
  var themeIDs = await getThemeID(heroID);
  return res.send(themeIDs);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
