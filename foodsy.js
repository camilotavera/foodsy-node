var express = require("express");
var app = express();
var user = "elEmo";


app.set('view engine','ejs');
app.set("views","views");
app.use(express.static('public'));

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
  res.render('animal',{user:user});
});


const port = process.env['PORT'] != null ? process.env['PORT'] : 80

app.listen(port);
