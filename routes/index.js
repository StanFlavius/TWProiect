var express = require('express');
var router = express.Router();
var fs = require('fs');
const cors = require('cors');

function getDb(){
    return JSON.parse(fs.readFileSync('DataBase.json','utf-8'));
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/problems',function (req,res,next) {
    var db = getDb();
  var diff = req.query.diff;
  problems= db.problems.filter(function (item) {
       return item.difficulty == diff;
   });
  res.status(200).send(problems);
})

/*POST*/

router.post('/problems/add',function (req,res,next) {
    if(req.body.name && req.body.link && req.body.difficulty){
        const problem = {
            name : req.body.name,
            link : req.body.link,
            difficulty : req.body.difficulty
        };
        console.log(problem);
        addProblem(problem);
        res.status(200).send();
    }
    else res.status(403).send();
})

function addProblem(problem){
    var db = getDb();
    db.problems.push(problem);
    var json = JSON.stringify(db);
    fs.writeFileSync('DataBase.json', json, 'utf8');
}

/*PUT*/
router.put('/problems/put', (req, res) =>  {
    if(req.body.name && req.body.difficulty){

        editProblem(req.body.name,req.body.difficulty);

        res.status(200).send();
    }
    else res.status(403).send();
});

function editProblem(name, difficulty){
    var db = getDb();
    for(var i = 0; i < db.problems.length; i++){
        if(db.problems[i].name == name)
            db.problems[i].difficulty = difficulty;
    }
    var json = JSON.stringify(db);
    fs.writeFileSync('DataBase.json', json, 'utf8');
}

/* DELETE */
router.delete('/problems/delete', (req, res) =>  {
    var name = req.query.name;
    if(name){

        deleteProblem(name);

        res.status(200).send();
    }
    else res.status(403).send();
});

function deleteProblem(name){
    var db = getDb();

    db.problems = db.problems.filter(function (it){
        return it.name != name;
    });

    var json = JSON.stringify(db);
    fs.writeFileSync('DataBase.json', json, 'utf8');
}

module.exports = router;

