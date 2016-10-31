function updateBoard(food_ration_on, times_a_day_on, inputIp, start, end ) {
  console.log(food_ration_on, times_a_day_on, inputIp, start, end);
  start_hour = start;
  var time = start.split(':');
  startHour = time[0];
  startMinutes = time[1];
  end_hour = end;
  var time = end.split(':');
  endHour = time[0];
  endMinutes = time[1];
  var board_IP = document.getElementById('ipBoard'+inputIp).value;
  if (board_IP.length < 7 ) {
    board_IP = '192.168.4.1';
  }
  var food_ration = parseInt(food_ration_on);
  var time_on = food_ration / 100;
  if (time_on < 0) {
    time_on = 1;
  }
  var times_a_day = parseInt(times_a_day_on);
  var seconds_in_day = 43200;
  var time_off = seconds_in_day / times_a_day;
  var request = 'http://'+ board_IP + '/pulse/d1?on=' + parseInt(time_on) + '&off=' + time_off;
  var timeToSet = 'http://'+ board_IP + '/time/config/work?hstart='+ startHour + '&mstart=' + startMinutes + '&hend=' + endHour + '&mend=' + endMinutes;
  console.log(timeToSet, request);
  httpGet(timeToSet);
  httpGet(request);
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
