window.onload = function() {
  readSensor();
};

function readSensor() {
  var cantidadComida = 0;
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        var response = JSON.parse(xmlhttp.responseText);
        cantidadComida = parseInt(response.a1 / 10);
        document.getElementsByClassName('indicador-comida')[0].style.height = cantidadComida + 'px'
        readSensor();
      }
  }
  xmlhttp.open("GET", 'http://192.168.0.9/a1');
  xmlhttp.send(null);
}
