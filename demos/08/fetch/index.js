"use strict";
//Global variable for interval timer
let myInterval = null;

//Register the event handler
document.getElementById("myButton1").addEventListener("click", handleButton1);
document.getElementById("myButton2").addEventListener("click", handleButton2);

//Handle button1
function handleButton1() {
  //Message "Waiting for data to be received"
  document.getElementById("myMessage").textContent =
    "Waiting for data to be received";
  myInterval = window.setInterval(showProgress, 1000);

  //Fetch the data
  //fetchData();
  fetch("animals.php")
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(`HTTP status ${response.status}`);
      }
    })
    .then((text) => {
      document.getElementById("myMessage").textContent = text;
    })
    .catch((error) => {
      document.getElementById("myMessage").textContent =
        "Data could not be received. An error happened.";
    })
    .finally(() => {
      window.clearInterval(myInterval);
      myInterval = null;
    });
}

//Handle button 2
function handleButton2() {
  alert("Send a Popup");
}

//Show a progress bar
function showProgress() {
  //Add a . to show a simple progress bar
  document.getElementById("myMessage").textContent =
    document.getElementById("myMessage").textContent + ".";
}

//Fetch the data (with an asynchronous function)
async function fetchData() {
  const fetchPromise = await fetch("animals.json");

  if (fetchPromise.ok == true) {
    document.getElementById("myMessage").textContent =
      await fetchPromise.text();
  } else {
    document.getElementById("myMessage").textContent =
      "Data could not be received. An error happened.";
  }
  window.clearInterval(myInterval);
  myInterval = null;
}
