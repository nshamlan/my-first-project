console.log(1);

console.error("This is an error!");

console.warn("Careful, this might break later!");

console.info("Server started on port 3000");

const users = [
  { id: 1, name: "Ahmad" },
  { id: 2, name: "Sara" }
];
console.table(users);


console.time("fast");
for (let i = 0; i < 1e5; i++) {}
console.timeEnd("fast");

console.time("slow");
for (let i = 0; i < 1e7; i++) {}
console.timeEnd("slow");


console.group("User #1");
console.log("Name: Ahmad");
console.log("Age: 20");

console.group("Posts");
console.log("Post 1: Hello World");
console.log("Post 2: JS Rocks");
console.groupEnd();

console.groupEnd(); 


// console.dir(document.body)

console.assert(1 === 2, "Math broke!"); 
console.assert(2 === 2, "Never shows");

function a() { b(); }
function b() { c(); }
function c() { console.trace("Trace here"); }
a();

for (let i = 0; i < 3; i++) console.count("loop");
