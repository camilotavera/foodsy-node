var correo = '';
var password = '';
var password2 = '';

function updateEmail(email){
  if (email.indexOf('@') < 0) {
    document.getElementById('emailMessage').innerHTML = 'Correo invalido';
  } else {
    correo = email;
    document.getElementById('emailMessage').innerHTML = '';
  }
}

function updatePass(pass) {
  password = pass;
  if (pass.length < 8) {
    document.getElementById('passMessage').innerHTML = 'La contraseña debe contener minimo 8 carácteres';
  } else {
    document.getElementById('passMessage').innerHTML = '';
  }
}

function equalPass(pass2) {
  password2 = pass2
  if (password !== pass2) {
    document.getElementById('pass2Message').innerHTML = 'Las contraseñas deben ser iguales';
  } else {
    document.getElementById('pass2Message').innerHTML = '';
  }
}

function saveUser() {
  if (correo.indexOf('@') > 0 && password.length >= 8 && password == password2) {
    var data = {
      user: correo,
      password: password
    }
    var formData = new FormData(document.forms.user);
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open("POST", '/registro');
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(data));
  }
}
