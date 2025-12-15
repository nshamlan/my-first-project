document.getElementById("fs").title = "f" //change content of id
document.getElementById("fs").textContent = "f\njgj" //change content of id
document.getElementById("fj") // id =
document.getElementsByClassName("js") //class =
document.getElementsByName("ail") //name =
document.getElementsByTagName("p") //<p>
document.querySelector(".js")      // first element with class="js"
document.querySelector("#fs")      // first element with id="fs"
document.querySelector("div > p")  // first <p> inside a <div>
document.querySelectorAll(".js").forEach(el => console.log(el));
document.forms["loginForm"]["username"].value
const el = document.getElementById("fs");
console.log(el.parentElement); // its parent
console.log(el.children);      // its kids


