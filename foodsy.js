var express = require("express");
var r= require('rethinkdb');
var app = express();
var user = "elEmo";
var conn = null;

app.set('view engine','ejs');
app.set("views","views");
app.use(express.static('public'));

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
        var data_animals=[
        {
          animal_name:'horse',
          food_ration: 450,
          times_a_day:3
        },{
          animal_name:'chicken',
          food_ration:50,
          times_a_day:3
        },{
          animal_name:'dog',
          food_ration:30,
          times_a_day:3
        },{
          animal_name:'pig',
          food_ration:100,
          times_a_day:5
        },{
          animal_name:'cat',
          food_ration:30,
          times_a_day:4
        },{
          animal_name:'lion',
          food_ration:500,
          times_a_day:5
        }
      ];

      if (!err) {
        r.db ('foodsy').table('animals').insert(data_animals).run(connection, function(err,res){

        });
      }
      else {
        r.db('foodsy').table('animals').get('2a342e75-dff3-449b-9695-7c0c5a23f625').run(connection, function(err,res){
          console.log(res);
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
app.get('/test',function(req,res){
  res.render('test',{user:user});
})

app.get('/selectanimal',function(req,res){
  res.render('selectanimal',{user:user});
});


app.get('/demo',function(req,res){
  res.render('demo',{user:user});
});
app.get('/admin',function(req,res){
  res.render('admin',{user:user});
});
app.get('/animal/:animal_name',function(req,res){
  animal_name= req.params.animal_name;
  console.log(animal_name);

  r.connect(rethinkDB_config, function(err,connection){
    r.db('foodsy').table('animals').filter(r.row('animal_name').eq(animal_name)).run(connection,function(err,cursor){

      cursor.toArray(function(err,result){

        var animal_data=result[0];
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
});
app.get('/animal/save/:animal_name/:times_a_day/:food_ration',function(req,res){  
  animal_name= req.params.animal_name;
  var times_a_day = parseInt(req.params.times_a_day);
  var food_ration = parseInt(req.params.food_ration);
    r.db('foodsy').table('animals').getAll(animal_name, {index:'animal_name'}).update({food_ration: food_ration, times_a_day: times_a_day}).run(conn,function(err,result){
      console.log(result);
    });
});

const port = process.env['PORT'] != null ? process.env['PORT'] : 80

app.listen(port);
