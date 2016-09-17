
var time_on=2000;
var speed_on= 30;

function click_button(){
  //192.168.0.6
  //setTimeout(httpGet("http://192.168.0.6"),500);
  setTimeout(turnOn,500);
  setTimeout(turnOff,time_on);

}
function turnOn(){
  console.log("Encender");
  httpGet("http://192.168.0.11/pwm?d2="+speed_on);
}

function turnOff(){
  console.log("apagar");
  httpGet("http://192.168.0.11/pwm?d2=100");
}




function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function updateTimeLabel(time) {
  console.log(time);
  document.getElementById("time_Value_label").innerHTML = time;
  time_on=time;
}
function updateSpeedLabel(speed) {
  console.log(speed);
  document.getElementById("speed_Value_label").innerHTML = speed;
  speed_on=speed;
}
