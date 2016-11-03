var boardIP = 'http://192.168.0.2/';
window.onload = function() {
  readSensorFood();
};

function readSensorFood() {
  var levelFood = 0;
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        var response = JSON.parse(xmlhttp.responseText);
        console.log(response);
        levelFood = parseInt(response.a1 / 10);
        document.getElementsByClassName('indicator-food')[0].style.height = levelFood + 'px'

        changeSensor(true);
      }
  }
  xmlhttp.open("GET", boardIP + 'a1');
  xmlhttp.send(null);
}

function changeSensor(battery) {
  if (battery) {
    request = boardIP + 'turn?d1=on';
  } else {
    request = boardIP + 'turn?d1=off';
  }
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        var response = JSON.parse(xmlhttp.responseText);
        if (battery) {
          setTimeout(function () {
            readSensorBattery();
          }, 500);
        } else {
          setTimeout(function () {
            readSensorFood();
          }, 500);

        }
      }
  }
  xmlhttp.open("GET", request);
  xmlhttp.send(null);
}

function readSensorBattery() {
  var levelBattery = 0;
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        var response = JSON.parse(xmlhttp.responseText);
        console.log(response);
        levelBattery = parseInt(response.a1 / 10);
        // document.getElementsByClassName('indicator-food')[0].style.height = levelFood + 'px'
        changeSensor(false);
      }
  }
  xmlhttp.open("GET", boardIP + 'a1');
  xmlhttp.send(null);
}
