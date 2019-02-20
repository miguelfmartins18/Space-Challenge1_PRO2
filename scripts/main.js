var myTimer = 1000;
var days = 300;
var distance = 1234567;
var actualDays = 300;


var shipParameters = {
  fuel: 100,
  speed: 25000
};

var shipEnv = {
  distanceMars: 246836486,
  gravity: 0,
  distanceTravelled: 0,
  oxygen: 100
};

var shipSupplies = {
  food: 10000,
  water: 20000
};

var days = document.querySelector(".days");
var fuelElements = document.querySelector(".fuelLevel");
var fuelMessage = document.querySelector(".fuelMessage");
var speedCurrent = document.querySelector(".speedCurrent");
var distMars = document.querySelector(".distMars");
var distTravelled = document.querySelector(".distTravelled");
var gravity = document.querySelector(".gravity");
var oxygen = document.querySelector(".oxygen");
var foodGlobal = document.querySelector(".foodGlobal");
var foodPerson = document.querySelector(".foodPerson");
var waterGlobal = document.querySelector(".waterGlobal");
var waterPerson = document.querySelector(".waterPerson");

var trip = setInterval(function () {
  fn_days();
  fn_fuelLevel();
  fn_currentSpeed();
  fn_distMars();
  fn_distTravelled();
  fn_gravity();
  fn_food();
  fn_water()
}, myTimer);

function fn_days() {
  actualDays -= 1;
  days.innerHTML = actualDays + " DAYS LEFT";
}

function fn_fuelLevel() {
  shipParameters.fuel -= 1;
  fuelElements.style.width = shipParameters.fuel + "%";
  if (shipParameters.fuel <= 60 && shipParameters.fuel > 40) {
    fuelElements.classList.add("fuelMidLevel");
    fuelMessage.style.color = "yellow";
    fuelMessage.innerHTML = "Running low on fuel, reduce speed!";
  } else if (shipParameters.fuel <= 20 && shipParameters.fuel > 0) {
    fuelElements.classList.add("fuelReserve");
    fuelMessage.style.color = "orange";
    fuelMessage.innerHTML = "STOP";
  }
  if (shipParameters.fuel == 1) {
    fuelMessage.style.color = "red";

    fuelMessage.innerHTML = "You ran out of fuel, consider yourself DEAD.";
    clearInterval(trip);

  }
}

function getRandomNumber(speedMin, speedMax) {
  return Math.random() * (speedMax - speedMin) + speedMin;
}

function fn_currentSpeed() {
  speedCurrent.innerHTML =
    Math.floor(
      getRandomNumber(shipParameters.speed - 1000, shipParameters.speed + 1000)
    ) + " km/h";
  if (shipParameters.fuel == 1) {
    speedCurrent.innerHTML = "Floating. Cannot determine speed";
  }
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function fn_distMars() {
  shipEnv.distanceMars -= distance;
  distMarsGlobal = shipEnv.distanceMars;
  distMars.innerHTML = formatNumber(shipEnv.distanceMars) + " km";
}

function fn_distTravelled() {
  shipEnv.distanceTravelled += distance;
  distTravelled.innerHTML = formatNumber(shipEnv.distanceTravelled) + " km";
}

function fn_gravity() {
  gravity.innerHTML = getRandomNumber(2, 0).toFixed(3) + " m/s^2";
}

oxygen.innerHTML = "<div>" + shipEnv.oxygen + " % </div> The air is clean and breathable";

function fn_food() {
  shipSupplies.food -= getRandomNumber(9, 12);
  foodGlobal.innerHTML =
    parseFloat(shipSupplies.food).toFixed(0) + " rations left";
  foodPerson.innerHTML =
    parseFloat((shipSupplies.food / 12).toFixed(0)) + " rations per person";
}

function fn_water() {
  shipSupplies.water -= getRandomNumber(6, 20);
  waterGlobal.innerHTML =
    parseFloat(shipSupplies.water).toFixed(0) + " liters left";
  waterPerson.innerHTML =
    parseFloat((shipSupplies.water / 12).toFixed(0)) + " liters per person";
}