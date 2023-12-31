//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var express = require('express'); var bodyParser = require('body-parser');
var process = require('process');
var path = require('path');
var pg = require('pg');
const{ json } = require('body-parser');

const app = express(); const port = 8100;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Frontend')));

app.get('/js/themes.js', async(req, res) =>{
  res.sendFile(path.join(__dirname, '../Frontend/js/themes.js'));});
app.get('/js/slots.js', async(req, res) =>{
  res.sendFile(path.join(__dirname, '../Frontend/js/slots.js'));});
app.get('/js/themesDataSL.js', async(req, res) =>{
  res.sendFile(path.join(__dirname, '../Frontend/js/themesDataSL.js'));});
app.get('/js/tricks.js', async(req, res) =>{
  res.sendFile(path.join(__dirname, '../Frontend/js/tricks.js'));});
app.get('/themes.css', async(req, res) =>{
  res.sendFile(path.join(__dirname, '../Frontend/themes.css'));});
app.get('/login.css', async(req, res) =>{
  res.sendFile(path.join(__dirname, '../Frontend/login.css'));});  
app.get('/manifest.json', async(req, res) =>{
  res.sendFile(path.join(__dirname, '../Frontend/manifest.json'));});
app.get('/icon.png', async(req, res) =>{
  res.sendFile(path.join(__dirname, '../Frontend/icon.png'));});
app.get('/serviceWorker.js', async(req, res) =>{
  res.sendFile(path.join(__dirname, '../Frontend/serviceWorker.js'));});
app.get('/js/fetchPost.js', async(req, res) =>{
  res.sendFile(path.join(__dirname, '../Frontend/js/fetchPost.js'));});
app.get('/js/diceRoller.js', async(req, res) =>{
  res.sendFile(path.join(__dirname, '../Frontend/js/diceRoller.js'));});  

  /*
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'anri1551',
});
pool.on('error', (err, client) =>{
  console.error('Unexpected error on idle client:', err);
  process.exit(-1);
});
pool.connect((err, client, done) =>{
  if(err){
    console.error('Error connecting to the database:', err.message);
    process.exit(-1);
  } 
  else{ console.log('Connected to the database'); }
});*/

const pool = new pg.Pool({
  user: 'apome',
  host: 'postgresql-apome.alwaysdata.net',
  database: 'apome_db',
  password: 'anri1551',
});
pool.on('error', (err, client) =>{
  console.error('Unexpected error on idle client:', err);
  process.exit(-1);
});
pool.connect((err, client, done) =>{
  if(err){
    console.error('Error connecting to the database:', err.message);
    process.exit(-1);
  } 
  else{ console.log('Connected to the database'); }
});


app.get('/', async(req, res) =>{
  res.sendFile(path.join(__dirname, '../Frontend/themes.html'));
});
app.get('/about', async(req, res) =>{
  res.sendFile(path.join(__dirname, '../Frontend/about.html'));
});  

async function getUserID(userName, password){
  return new Promise((resolve, reject) =>{
    var SQLTextQuery = `SELECT id FROM cityofmist.t_user WHERE user_name=$1 and password=$2;`;
    pool.query(SQLTextQuery, [userName, password], (err, rows, fields) =>{
      if(err){ reject(err); return; }
      resolve(rows.rows);
    });
  });
}

app.get('/addUser', async(req, res) =>{
  res.sendFile(path.join(__dirname, '../Frontend/login.html'));
});
app.post('/addUser', async (req, res) =>{
  var loginData = req.body;
  var userName = loginData["username"];
  var password = loginData["password"];
  if(userName&&password){
    var userID = await getUserID(userName, password);
    if(userID.length==0){
      var SQLTextQuery = `INSERT INTO cityofmist.t_user (user_name, password) VALUES ($1, $2);`;
      pool.query(SQLTextQuery, [userName, password], (err, rows, fields) =>{
        console.log(err)
        if(err){ return res.send("0"); }
        else{ return res.send("1"); } 
      });
    }
    else{ return res.send("1"); }
  }
  else{ return res.send("0") }
});

async function getHeroID(userID, heroSubID){
  return new Promise((resolve, reject) =>{
    var SQLTextQuery = `SELECT id FROM cityofmist.hero WHERE user_hero_subid=$1 and user_id=$2;`;
    pool.query(SQLTextQuery, [heroSubID, userID], (err, rows, fields) =>{
      if(err){ reject(err); return; }
      resolve(rows.rows);
    });
  });
}
app.post('/loadHero', async(req, res) =>{
  var themeData = req.body;
  var userName  = themeData["userName"];
  var password  = themeData["password"];
  var userID = await getUserID(userName, password);
  var saveSlotsData={ "saveSlotNames": [], "saveSlotIDs"  : [], };
  if(userID.length>0){
    console.log(userID)
    userID=userID[0]["id"];
    var SQLTextQuery = `SELECT hero_name, user_hero_subid FROM cityofmist.hero WHERE user_id=$1;`;
    pool.query(SQLTextQuery, [userID], (err, rows, fields) =>{
      if(err){ return err; }
      else{
        var heroData = rows.rows;
        if(heroData.length>0){
          var saveSlotNames = heroData.map(function(heroData){return heroData["hero_name"]});
          var saveSlotIDs = heroData.map(function(heroData){return heroData["user_hero_subid"]});
          console.log(saveSlotNames, saveSlotIDs)
          saveSlotsData["saveSlotNames"]=saveSlotNames;
          saveSlotsData["saveSlotIDs"]=saveSlotIDs;
          return res.send(saveSlotsData);
        }
        else{ return res.send(saveSlotsData); }
      }
    });
  }
  else{ return res.send(saveSlotsData); }
});
async function addHero(userID, heroName, heroSubID){
  return new Promise((resolve, reject) =>{
    var SQLTextQuery = `INSERT INTO cityofmist.hero (user_id, hero_name, user_hero_subid) VALUES ($1, $2, $3);`;
    pool.query(SQLTextQuery, [userID, heroName, heroSubID], (err, rows, fields) =>{
      if(err){ reject(err); return; }
      resolve(rows.rows);
    });
  });
}
app.post('/addHero', async(req, res) =>{
  var themeData = req.body;
  var userName  = themeData["userName"];
  var password  = themeData["password"];
  var heroSubID = themeData["heroSubID"];
  var heroName  = themeData["heroName"];
  if(userName&&password){
    var userID = await getUserID(userName, password);
    if((userID.length>0)&&heroName&&heroSubID){
      userID = userID[0]["id"];
      await addHero(userID, heroName, heroSubID);
      return res.send("Hero Added");
    }
  }
  res.send("Hero Not Added");
});

async function getThemeID(heroID){
  return new Promise((resolve, reject) =>{
    var SQLTextQuery = `SELECT id FROM cityofmist.theme WHERE hero_id=$1 LIMIT 4;`;
    pool.query(SQLTextQuery, [heroID], (err, rows, fields) =>{
      if(err){ reject(err); return; }
      resolve(rows.rows);
    });
  });
}
async function getThemeTags(themeID){
  themeTags ={ "questionLetter": [], "text": [], "burned": [], "tagType": []}
    return new Promise((resolve, reject) =>{
    var SQLTextQuery = `SELECT * FROM cityofmist.tag WHERE theme_id=$1;`;
    pool.query(SQLTextQuery, [themeID], (err, rows, fields) =>{
      for (var k = 0; k < rows.rows.length; k++){
        themeTags["questionLetter"].push(rows.rows[k]["letter"]);
        themeTags["text"]          .push(rows.rows[k]["tag_name"]);
        themeTags["burned"]        .push(rows.rows[k]["burned"]);
        themeTags["tagType"]       .push(rows.rows[k]["tag_type"]);
        if((k+1)==rows.rows.length){ resolve(themeTags); }
      }
    });
  });
}
async function getTags(themeIDs){
  var allTags ={ "id1": null, "id2": null, "id3": null, "id4": null, };
  return new Promise(async(resolve, reject) =>{
    for (var i=0; i<themeIDs.length; i++){
      if((i+1)==themeIDs.length){
        allTags["id"+(i+1)] = await getThemeTags(themeIDs[i]["id"]);
        resolve(allTags);
        reject("error");
      }
      else{
        allTags["id"+(i+1)] = await getThemeTags(themeIDs[i]["id"]);
      }
    }
  });
}
app.post('/loadTheme', async(req, res) =>{
  var themeData = req.body;
  userName = themeData["userName"];
  password = themeData["password"];
  heroSubID = themeData["heroSubID"];

  themeTypeJson ={ "a": [] };
  logosMythosJson ={ "a": [] };
  titleTextJson={ "title": [] };
  textBoxTextJson={ "textBox": [] };
  CheckboxesJson ={
    "theme1":{ "attention": [], "fade": [], },
    "theme2":{ "attention": [], "fade": [], },
    "theme3":{ "attention": [], "fade": [], },
    "theme4":{ "attention": [], "fade": [], }
  };
  var allTags ={
    "id1":{ "questionLetter": [], "text": [], "burned": [], "tagType": []},
    "id2":{ "questionLetter": [], "text": [], "burned": [], "tagType": []},
    "id3":{ "questionLetter": [], "text": [], "burned": [], "tagType": []},
    "id4":{ "questionLetter": [], "text": [], "burned": [], "tagType": []},
  };
  postedData ={
    "ThemeType": [themeTypeJson["a"], logosMythosJson["a"]],
    "TextData": [titleTextJson["title"], textBoxTextJson["textBox"]],
    "Checkboxes": CheckboxesJson,
    "TagData": allTags,
  };

  if(userName&&password){
    var userID   = await getUserID(userName, password);
    if((userID.length>0)&&heroSubID){
      var heroID   = await getHeroID(userID[0]["id"], heroSubID);
      if(heroID.length>0){
        var themeIDs = await getThemeID(heroID[0]["id"]);
        var SQLTextQuery = `SELECT * FROM cityofmist.theme WHERE hero_id=$1;`;
        pool.query(SQLTextQuery, [heroID[0]["id"]], async(err, rows, fields) =>{
          if(themeIDs.length>0){
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
            var allTags = await getTags(themeIDs);
            postedData["TagData"]=allTags;
            return res.send(postedData);
          }
          else{ return res.send(postedData); }
        });
      }
      else{ return res.send(postedData); }
    }
    else{ return res.send(postedData); }
  }
  else{ return res.send(postedData); }
});

function areThemesDefined(heroID){
  return new Promise((resolve, reject) =>{
    var SQLTextQuery = 
    `SELECT COUNT(*) as count FROM cityofmist.theme WHERE hero_id = $1;`
    pool.query(SQLTextQuery, [heroID], (err, rows, fields) =>{
      console.log(err);
      if(err){ reject({ "error": err }); return; }
      else{
        if( parseInt(rows.rows[0]["count"])>=4){ resolve(1); }
        else{ resolve(0); }
      }
    });
  });
}
async function addTheme(
  LogosMythos1, Type1, Attention1, Fade1, heroID, Title1, Mystery1,
  LogosMythos2, Type2, Attention2, Fade2, Title2, Mystery2,
  LogosMythos3, Type3, Attention3, Fade3, Title3, Mystery3,
  LogosMythos4, Type4, Attention4, Fade4, Title4, Mystery4,
  tagData
  ){
    return new Promise(async(resolve, reject) =>{
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
      $54,  $55,  $56,  $57,
      $58,  $59,  $60,  $61
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
        tagData["id"+1]["text"].length, tagData["id"+1]["burned"], tagData["id"+1]["text"], tagData["id"+1]["questionLetter"],
        tagData["id"+2]["text"].length, tagData["id"+2]["burned"], tagData["id"+2]["text"], tagData["id"+2]["questionLetter"],
        tagData["id"+3]["text"].length, tagData["id"+3]["burned"], tagData["id"+3]["text"], tagData["id"+3]["questionLetter"],
        tagData["id"+4]["text"].length, tagData["id"+4]["burned"], tagData["id"+4]["text"], tagData["id"+4]["questionLetter"],
        tagData["id"+1]["tagType"],
        tagData["id"+2]["tagType"],
        tagData["id"+3]["tagType"],
        tagData["id"+4]["tagType"]
      ],
      (err, rows, fields) =>{
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
  return new Promise((resolve, reject) =>{
    var SQLTextQuery = 
    `CALL cityofmist."sp_updateTheme"(
      $1,   $2,   $3,   $4,   $5,   $6,   $7,   $8,   $9,   $10,  $11,  $12,
      $13,  $14,  $15,  $16,  $17,  $18,  $19,  $20,  $21,  $22,  $23,  $24,
      $25,  $26,  $27,  $28,  $29,  $30,  $31,  $32,  $33,  $34,  $35,  $36,
      $37,  $38,  $39,  $40,  $41,  $42,  $43,  $44,
      $45,  $46,  $47,  $48,
      $49,  $50,  $51,  $52,
      $53,  $54,  $55,  $56,
      $57,  $58,  $59,  $60,
      $61,  $62,  $63,  $64
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
        themeID1, themeID2, themeID3, themeID4,
        tagData["id"+1]["text"].length, tagData["id"+1]["burned"],  tagData["id"+1]["text"],    tagData["id"+1]["questionLetter"],
        tagData["id"+2]["text"].length, tagData["id"+2]["burned"],  tagData["id"+2]["text"],    tagData["id"+2]["questionLetter"],
        tagData["id"+3]["text"].length, tagData["id"+3]["burned"],  tagData["id"+3]["text"],    tagData["id"+3]["questionLetter"],
        tagData["id"+4]["text"].length, tagData["id"+4]["burned"],  tagData["id"+4]["text"],    tagData["id"+4]["questionLetter"],
        tagData["id"+1]["tagType"],     tagData["id"+2]["tagType"], tagData["id"+3]["tagType"], tagData["id"+4]["tagType"]
      ], (err, rows, fields) =>{
        console.log(err);
        if(err){ reject({ "error": err }); return; }
        else{ resolve({ "success": "new Theme added" }); }
      });
  });
}
app.post('/saveThemes', async(req, res) =>{
  var themeData = req.body["themeData"];
  var navData = req.body["navData"];
  var userName = navData["userName"];
  var password = navData["password"];
  var heroSubID = navData["heroSubID"];
  if(themeData&&navData&&userName&&password&&heroSubID){
    var userID = await getUserID(userName, password);
    userID = userID[0]["id"];
    var heroID = await getHeroID(userID, heroSubID);
    heroID = heroID[0]["id"];
    if((userID.length>0)&&(heroID.length>0)){
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
    
      var themesDefined = await areThemesDefined(heroID);
      if(themesDefined.length==0){
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
        if(themeIDs.length>0){
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
        else{ res.send("theme Not Updated"); }
      }
    }
    else{ res.send("theme Not Updated or Added"); }
  }
});

app.listen(port, () =>{
  console.log(`Example app listening on port ${port}`);
});
