var express = require("express");
var r= require('rethinkdb');
var app = express();
var user = "";
var conn = null;
var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;


passport.use(new Strategy(
  function(username, password, cb) {
    r.db ('foodsy').table('users').filter({email:username}).run(conn, function(err,cursor){
      cursor.toArray(function (err, users) {
        user = users[0];
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        if (user.password != password) { return cb(null, false); }
        return cb(null, user);
      });
    });
  }));


  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    r.db ('foodsy').table('users').get(id).run(conn, function(err,user){
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.set('view engine','ejs');
app.set("views","views");
app.use(express.static('public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.locals.req = req;
  next();
})


app.use(passport.initialize());
app.use(passport.session());


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
        r.db ('foodsy').tableCreate('user_animals').run(connection, function(err,res){
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
  console.log(req.user);
  res.render('home',{user:user});
});


app.get('/selectanimal',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('selectanimal', { user: req.user });
  });

// app.get('/selectanimal',function(req,res){
//   res.render('selectanimal',{user:user});
// });

app.get('/registrarse',function(req,res){
  res.render('registro',{user:user});
});


app.get('/animal/:animal_name', require('connect-ensure-login').ensureLoggedIn(), function(req,res){
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

app.post('/saveanimal', require('connect-ensure-login').ensureLoggedIn(), function (req,res) {
  req.body.user_id = req.user.id;
  console.log(req.body);
  r.db('foodsy').table('user_animals').insert(req.body).run(conn, function(err,result){
    res.send(200);
  })
});

app.post('/deleteanimal', require('connect-ensure-login').ensureLoggedIn(), function (req,res) {
  r.db('foodsy').table('user_animals').get(req.body.id).delete().run(conn, function(err,result){
    res.send(200);
  });
});

app.post('/register', function (req,res) {
  r.db('foodsy').table('users').insert(req.body).run(conn, function(err,result){
    redirect();
  });
  function redirect() {
    res.send(200);
  }
});

app.get('/login',
  function(req, res){
    res.render('login', {login_fail: false});
  });

app.post('/login', passport.authenticate('local', { failureRedirect: '/login', login_fail: true }), function(req, res) {
    console.log(req.body);
    res.redirect('/');
  });

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/myanimals',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    r.db ('foodsy').table('user_animals').filter({user_id:req.user.id}).run(conn, function(err,cursor){
      cursor.toArray(function (err, animals) {
        res.render('myanimals', { user: req.user, animals: animals });
      })
    })

  });


const port = process.env['PORT'] != null ? process.env['PORT'] : 80

app.listen(port);
