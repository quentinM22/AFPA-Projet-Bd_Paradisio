let booly = sessionStorage.getItem("booly")
  ? sessionStorage.getItem("booly")
  : 1;
let firstName = sessionStorage.getItem("firstName")
  ? sessionStorage.getItem("firstName")
  : "";

let lastName = sessionStorage.getItem("lastName")
  ? sessionStorage.getItem("lastName")
  : "";

let email = sessionStorage.getItem("email")
  ? sessionStorage.getItem("email")
  : "";

let city = sessionStorage.getItem("city") ? sessionStorage.getItem("city") : "";

if (booly == 1) {
  document.getElementById("connection").style.display = "block";
  document.getElementById("disconnection").style.display = "none";
}
if (booly == 0) {
  oldUser = document.getElementById("disconnection").firstElementChild;
  user = document.createElement("p");
  user.textContent = `Vous êtes connecté en tant que ${firstName} ${lastName}`;
  document.getElementById("disconnection").replaceChild(user, oldUser);
  document.getElementById("connection").style.display = "none";
  document.getElementById("disconnection").style.display = "block";
}

document.querySelector("#connection").addEventListener("submit", (e) => {
  e.preventDefault();
  oldUser = document.getElementById("disconnection").firstElementChild;
  user = document.createElement("p");
  firstName = document.getElementById("firstName").value;
  sessionStorage.setItem("firstName", firstName);
  lastName = document.getElementById("lastName").value;
  sessionStorage.setItem("lastName", lastName);
  email = document.getElementById("email").value;
  sessionStorage.setItem("email", email);
  city = document.getElementById("city").value;
  sessionStorage.setItem("city", city);
  user.textContent = `Vous êtes connecté en tant que ${firstName} ${lastName}`;
  document.getElementById("disconnection").replaceChild(user, oldUser);
  if (document.getElementById("connection").style.display === "block") {
    document.getElementById("connection").style.display = "none";
    document.getElementById("disconnection").style.display = "block";
  } else {
    document.getElementById("connection").style.display = "block";
    document.getElementById("disconnection").style.display = "none";
  }
  booly = 0;
  sessionStorage.setItem("booly", booly);
});

document.querySelector("#disconnection").addEventListener("submit", (e) => {
  e.preventDefault();
  if (document.getElementById("disconnection").style.display === "block") {
    document.getElementById("connection").style.display = "block";
    document.getElementById("disconnection").style.display = "none";
  } else {
    document.getElementById("connection").style.display = "none";
    document.getElementById("disconnection").style.display = "block";
  }
  sessionStorage.setItem("booly", booly);
});
