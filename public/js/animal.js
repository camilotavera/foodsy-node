var Age_on = 6;

//function click_button(){
  //192.168.0.6
  //setTimeout(httpGet("http://192.168.0.6"),500);
//  setTimeout(turnOn,500);
//  setTimeout(turnOff,time_on);


  function updateAgeLabel(Age) {
    console.log(Age);
    document.getElementById("Age_Value_label").innerHTML = Age;
    Age_on = Age;
  }
