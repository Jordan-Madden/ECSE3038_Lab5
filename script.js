// POST
document.getElementById("new-tank-submit").addEventListener("click", function(event){
    event.preventDefault();
    let tankLocation = document.getElementById("new-tank-location").value;
    let tankLat = document.getElementById("new-tank-latitude").value;
    let tankLong = document.getElementById("new-tank-longitude").value;
    let tankPF = document.getElementById("new-tank-pf").value;

    let jsonBody = {
        "location": tankLocation,
        "latitude": tankLat,
        "longitude": tankLong,
        "percentage_full": tankPF,
    };

    fetch("http://127.0.0.1:5000/data", {
        method: "POST",
        body: JSON.stringify(jsonBody),
        headers:{
            "Content-type": "application/json",
        },
    })
    .then((res) => res.json)
    .then((json) => console.log(json));
});

//GET
function createTankCard(tank){
    var tankCardDiv = document.createElement("DIV");
    tankCardDiv.classList.add("tank-card");

    var tankLocationDiv = document.createElement("DIV");
    tankLocationDiv.classList.add("tank-location");
    var tankInfoLocationDiv = document.createElement("SPAN");
    tankInfoLocationDiv.classList.add("location");
    tankInfoLocationDiv.innerHTML = tank.location;
    tankLocationDiv.append(tankInfoLocationDiv);                

    var tankLatDiv = document.createElement("DIV");
    tankLatDiv.classList.add("tank-latitude");
    var tankInfoLatDiv = document.createElement("SPAN");
    tankInfoLatDiv.classList.add("latitude");
    tankInfoLatDiv.innerHTML = tank.latitude;
    tankLatDiv.append(tankInfoLatDiv);

    var tankLongDiv = document.createElement("DIV");
    tankLongDiv.classList.add("tank-longitude");
    var tankInfoLongDiv = document.createElement("SPAN");
    tankInfoLongDiv.classList.add("longitude");
    tankInfoLongDiv.innerHTML = tank.longitude;
    tankLongDiv.append(tankInfoLongDiv);

    var tankPFDiv = document.createElement("DIV");
    tankPFDiv.classList.add("tank-pf");
    var tankInfoPFDiv = document.createElement("SPAN");
    tankInfoPFDiv.classList.add("pf");
    tankInfoPFDiv.innerHTML = tank.percentage_full;
    tankPFDiv.append(tankInfoPFDiv);

    tankCardDiv.append(tankLocationDiv);
    tankCardDiv.append(tankLatDiv);
    tankCardDiv.append(tankLongDiv);
    tankCardDiv.append(tankPFDiv);

    return tankCardDiv;
}

function getTanks(){
    return fetch("http://127.0.0.1:5000/data")
    .then((res) => res.json())
    .then((json) => json);
}

async function display(){
    let tanks = await getTanks();
    console.log(tanks);
    tanks.forEach((tank) => {
        var container = document.querySelector(".container");
        container.append(createTankCard(tank));
    });
}

var container = document.querySelector(".container");

window.onload = function () {
    console.log("Hello!");
  display();
};