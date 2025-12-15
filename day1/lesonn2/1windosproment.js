// it will add the vale to the consel 
let q;
q = window.prompt("are u gay ?")
 console.log(q)

 // let us move to a better way with real html this did not work as plan 
 document.getElementById("id").onclick = changeful() // the id of the botoom 

 //can change everything
 function changeful() {
    q = document.getElementById("id").value
    z = document.getElementById("car").textContent = "war"
    console.log(q,z)
 }
 //while this works ???
 document.getElementById("id").onclick = function() {
    document.getElementById("h").textContent = "i hate u"
    document.getElementById("boy").textContent = "yes"
}

// searching for  it  now ...
//the corecute way was to add return i asked chat gbt this is a negative point for me 
document.getElementById("id").onclick = () => {
    let result = changeful()
    console.log("The function returned:", result)
}

function changeful() {
    let q = document.getElementById("id").value
    let z = document.getElementById("car").textContent = "war"
    
    // return both values in an object
    return { q, z }
}
// () => { ... } === function() { ... }