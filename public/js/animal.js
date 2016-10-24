var age_on = 6;
var weigth_on = 6;
var times_a_day_on = 3;
var food_ration_on = 200;
var board_IP = "0.0.0.0";
var startHour = 5;
var startMinutes = 0;
var endHour = 20;
var endMinutes = 0;
var resultWeigthAge = 18;
var start_hour = "5:00";
var end_hour = "20:00";

function updateAgeLabel(age) {
  console.log(age);
  document.getElementById("age_value_label").innerHTML = age;
  age_on = age;
  resultWeigthAge = (age_on * weigth_on) / 2;
  document.getElementsByName("food_ration_slider")[0].value = resultWeigthAge;
  document.getElementById('food_ration_value_label').innerHTML = resultWeigthAge;
  console.log(resultWeigthAge);
}
function updateWeigthLabel(weight) {
  console.log(weight);
  document.getElementById("weigth_value_label").innerHTML = weight;
  weigth_on = weight;
  resultWeigthAge = (age_on * weigth_on) / 2;
  document.getElementsByName("food_ration_slider")[0].value = resultWeigthAge;
  document.getElementById('food_ration_value_label').innerHTML = resultWeigthAge;
  console.log(resultWeigthAge);
}
function updateTimesADayLabel(timesADay) {
  console.log(timesADay);
  document.getElementById("times_a_day_value_label").innerHTML = timesADay;
  times_a_day_on = timesADay;
}
function updateFoodRationLabel(grams) {
  console.log(grams);
  document.getElementById("food_ration_value_label").innerHTML = grams;
  food_ration_on = grams;
}


function updateStartHour(start){
  start_hour = start;
  var time = start.split(':');
  startHour = time[0];
  startMinutes = time[1];
}

function updateEndHour(end){
  end_hour = end;
  var time = end.split(':');
  endHour = time[0];
  endMinutes = time[1];
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function saveAnimalSettings(animalName){
  var animal_name = animalName;
  var food_ration = food_ration_on;
  var times_a_day = times_a_day_on;
  var request = '/animal/save/'+animal_name+'/'+times_a_day+'/'+food_ration+'/'+start_hour+'/'+end_hour;
  alert("Guardar ajustes para " + animal_name + ": Porciones por día: " +  times_a_day + ", Peso comida: " + food_ration + " (gramos).");
  httpGet(request);
}

function updateIP(ip) {
  console.log(ip);
  board_IP = ip;
}

function updateBoard() {
  var food_ration = parseInt(food_ration_on);
  var time_on = food_ration / 100;
  if (time_on < 0) {
    time_on = 1;
  }
  var times_a_day = parseInt(times_a_day_on);
  var seconds_in_day = 43200;
  var time_off = seconds_in_day / times_a_day;
  var request = 'http://'+ board_IP + '/pulse/d2?on=' + parseInt(time_on) + '&off=' + time_off;
  var timeToSet = 'http://'+ board_IP + '/time/config/work?hstart='+ startHour + '&mstart=' + startMinutes + '&hend=' + endHour + '&mend=' + endMinutes;

  alert(timeToSet + request);
  httpGet(timeToSet);
  httpGet(request);
}
