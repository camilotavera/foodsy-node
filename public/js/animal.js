var Age_on = 6;
var Peso_on = 600;
var Porciones_on = 3;
var Grams_on = 200;

  function updateAgeLabel(Age) {
    console.log(Age);
    document.getElementById("Age_Value_label").innerHTML = Age;
    Age_on = Age;
  }
  function updatePesoLabel(Peso) {
    console.log(Peso);
    document.getElementById("Peso_Value_label").innerHTML = Peso;
    Peso_on = Peso;
  }
  function updatePorcionesLabel(Porciones) {
    console.log(Porciones);
    document.getElementById("Porciones_Value_label").innerHTML = Porciones;
    Porciones_on = Porciones;
  }
  function updateGramsLabel(Grams) {
    console.log(Grams);
    document.getElementById("Grams_Value_label").innerHTML = Grams;
    Grams_on = Grams;
  }
