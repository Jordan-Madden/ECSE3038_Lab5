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
    var tankInfoLocationDiv1 = document.createElement("SPAN");
    tankInfoLocationDiv1.classList.add("location1");
    tankInfoLocationDiv1.innerHTML = "Location";
    var tankInfoLocationDiv2 = document.createElement("SPAN");
    tankInfoLocationDiv2.classList.add("location2");
    tankInfoLocationDiv2.innerHTML = tank.location;
    tankLocationDiv.append(tankInfoLocationDiv1); 
    tankLocationDiv.append(tankInfoLocationDiv2);               

    var tankLatDiv = document.createElement("DIV");
    tankLatDiv.classList.add("tank-latitude");
    var tankInfoLatDiv1 = document.createElement("SPAN");
    tankInfoLatDiv1.classList.add("latitude1");
    tankInfoLatDiv1.innerHTML = "Latitude";
    var tankInfoLatDiv2 = document.createElement("SPAN");
    tankInfoLatDiv2.classList.add("latitude2");
    tankInfoLatDiv2.innerHTML = tank.latitude;
    tankLatDiv.append(tankInfoLatDiv1);
    tankLatDiv.append(tankInfoLatDiv2);

    var tankLongDiv = document.createElement("DIV");
    tankLongDiv.classList.add("tank-longitude");
    var tankInfoLongDiv1 = document.createElement("SPAN");
    tankInfoLongDiv1.classList.add("longitude1");
    tankInfoLongDiv1.innerHTML = "Longitude";
    var tankInfoLongDiv2 = document.createElement("SPAN");
    tankInfoLongDiv2.classList.add("longitude2");
    tankInfoLongDiv2.innerHTML = tank.longitude;
    tankLongDiv.append(tankInfoLongDiv1);
    tankLongDiv.append(tankInfoLongDiv2);

    var tankPFDiv = document.createElement("DIV");
    tankPFDiv.classList.add("tank-pf");
    var tankInfoPFDiv1 = document.createElement("SPAN");
    tankInfoPFDiv1.classList.add("pf1");
    tankInfoPFDiv1.innerHTML = "Percentage Full";
    var tankInfoPFDiv2 = document.createElement("SPAN");
    tankInfoPFDiv2.classList.add("pf2");
    tankInfoPFDiv2.innerHTML = tank.percentage_full;
    tankPFDiv.append(tankInfoPFDiv1);
    tankPFDiv.append(tankInfoPFDiv2);   

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