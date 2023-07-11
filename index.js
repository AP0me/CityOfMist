var express = require('express'); var bodyParser = require('body-parser');
var process = require('process');
var path = require('path');
var pg = require('pg');

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

async function getHeroID(userID, heroName){
  return new Promise((resolve, reject) => {
    var SQLTextQuery = `SELECT id FROM cityofmist.hero WHERE hero_name=$1 and user_id=$2;`;
    pool.query(SQLTextQuery, [heroName, userID], (err, rows, fields) => {
      if(err) { reject(err); return; }
      resolve(rows.rows);
    });
  });
}
app.post('/loadHero', async(req, res) => {
  var themeData = req.body;
  var userName = themeData["userName"];
  var password = themeData["password"];
  var heroName = themeData["heroName"];
  var userID = await getUserID(userName, password);
  var heroID = await getHeroID(userID, heroName);
  return res.send(heroID);
});

async function getTagID(themeID){
  return new Promise((resolve, reject) => {
    var SQLTextQuery = `SELECT id FROM cityofmist.tag WHERE theme_id=$1`;
    pool.query(SQLTextQuery, [themeID], (err, rows, fields) => {
      if(err) { reject(err); return; }
      resolve(rows.rows);
    });
  });
}
async function getThemeID(heroID){
  return new Promise((resolve, reject) => {
    var SQLTextQuery = `SELECT id FROM cityofmist.theme WHERE hero_id=$1 LIMIT 4;`;
    pool.query(SQLTextQuery, [heroID], (err, rows, fields) => {
      if(err) { reject(err); return; }
      resolve(rows.rows);
    });
  });
}
app.post('/loadTheme', async(req, res) => {
  //{ "userName": "public", "password": "password", "heroName": "Bob" }
  var themeData = req.body;

  userName = themeData["userName"];
  password = themeData["password"];
  heroName = themeData["heroName"];
  var userID = await getUserID(userName, password);
  var heroID = await getHeroID(userID[0]["id"], heroName);
  var themeIDs = await getThemeID(heroID[0]["id"]);

  var tagIDs=[];
  for (var i=0; i<themeIDs.length; i++) {
    var themeID = themeIDs[i]["id"];
    var tagID = await getTagID(themeID);// TODO
    tagIDs.push(tagID);
  }
  return res.send([themeIDs, tagIDs]);
});
app.post('/createTheme', async(req, res) => {
  /*{ 
      "themeData": { "LogosMythos": 0, "Type": 1, "Title": "Title", "AttentionFade": "110100", "Mystery": "Mystery"},
      "navData": { "userName": 0, "password": "password", "heroName": "Bob" }
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
  var heroName = navData["heroName"];

  var userID = await getUserID(userName, password);
  var heroID = await getHeroID(userID, heroName)[0]["id"];
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
  var heroName = themeData["heroName"];
  var userID = await getUserID(userName, password);
  var heroID = await getHeroID(userID, heroName);
  var themeIDs = await getThemeID(heroID);
  return res.send(themeIDs);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
