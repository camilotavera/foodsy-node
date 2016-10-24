var express = require("express");
var r= require('rethinkdb');
var app = express();
var user = "";
var conn = null;

app.set('view engine','ejs');
app.set("views","views");
app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

var rethinkDB_config={
  host:'localhost',
  port: 28015
}
r.connect(rethinkDB_config, function(err, connection){
  if(err) console.log(err);
  if(connection) {
    conn = connection;
    console.log('connected to rethinkDB');
      r.dbCreate('foodsy').run(connection, function(err, res){
      r.db ('foodsy').tableCreate('animals').run(connection, function(err,res){
        r.db ('foodsy').table('animals').indexCreate('animal_name').run(connection, function(err,res){
        });
        r.db ('foodsy').tableCreate('users').run(connection, function(err,res){
        });
        var data_animals=[
        {
          animal_name:'caballo',
          food_ration: 450,
          times_a_day:3
        },{
          animal_name:'pollo',
          food_ration:50,
          times_a_day:3
        },{
          animal_name:'perro',
          food_ration:30,
          times_a_day:3
        },{
          animal_name:'cerdo',
          food_ration:100,
          times_a_day:5
        },{
          animal_name:'gato',
          food_ration:30,
          times_a_day:4
        },{
          animal_name:'leon',
          food_ration:500,
          times_a_day:5
        }
      ];
      if (!err) {
        console.log("crear tabla");
        r.db ('foodsy').table('animals').insert(data_animals).run(connection, function(err,res){

        });
      }
   });
  });
 }
});

app.get('/',function (req,res){
  console.log("alguien entro a la raiz del sitio");
  res.render('home',{user:user});
});

app.get('/profile',function (req,res){
  res.render('profile',{user:user});
});

app.get('/selectanimal',function(req,res){
  res.render('selectanimal',{user:user});
});

app.get('/registrarse',function(req,res){
  res.render('registro',{user:user});
});


app.get('/animal/:animal_name',function(req,res){
  animal_name= req.params.animal_name;
  r.db('foodsy').table('animals').filter(r.row('animal_name').eq(animal_name)).run(conn,function(err,cursor){
    cursor.toArray(function(err,result){
      var animal_data = result[0];
      if(animal_data){
        console.log("Animal Name:" +animal_data.animal_name);
        console.log("food_ration:" +animal_data.food_ration);
        console.log("times_a_day:" +animal_data.times_a_day);
        res.render('animal',{user:user, animal_data: animal_data});
      }
      else res.redirect('/selectanimal');
    });
  });
});

app.get('/animal/save/:animal_name/:times_a_day/:food_ration/:start_hour/:end_hour',function(req,res){
  start_hour = req.params.start_hour;
  end_hour = req.params.end_hour;
  animal_name= req.params.animal_name;
  var times_a_day = parseInt(req.params.times_a_day);
  var food_ration = parseInt(req.params.food_ration);
  r.db('foodsy').table('animals').getAll(animal_name, {index:'animal_name'}).update({food_ration: food_ration, times_a_day: times_a_day, start_hour: start_hour, end_hour: end_hour}).run(conn,function(err,result){
    console.log(result);
    if (result.replaced > 0) {
      res.send(200);
    } else {
      res.send(404);
    }
  });
});

app.post('/registro', function (req,res) {
  console.log(req.body);
});
const port = process.env['PORT'] != null ? process.env['PORT'] : 80

app.listen(port);
