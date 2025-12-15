
console.log("Addition:");
console.log("5 + 3 =", 5 + 3);
console.log('"5" + 3 =', "5" + 3); // string concatenation
console.log();

console.log("Subtraction:");
console.log("5 - 3 =", 5 - 3);
console.log('"5" - 3 =', "5" - 3); // string coerces to number
console.log();

console.log("Multiplication:");
console.log("5 * 3 =", 5 * 3);
console.log('"5" * 3 =', "5" * 3);  // string coerces to number
console.log();

console.log("Division:");
console.log("10 / 2 =", 10 / 2);
console.log("'7' / 2 =", '7' / 2); // always float
console.log();

console.log("Modulus:");
console.log("5 % 2 =", 5 % 2);
console.log("'10' % 3 =", '10' % 3);
console.log();

// math.power (**)
console.log("Exponentiation:");
console.log("2 ** 3 =", 2 ** 3);
console.log("'10' ** 0 =", '10' ** 0);
console.log();

let x = 5;
console.log("Assignment operators (starting x = 5):");

x += 3; 
console.log("x += 3 →", x);

x -= 2; 
console.log("x -= 2 →", x);

x *= 4; 
console.log("x *= 4 →", x);

x /= 6; 
console.log("x /= 6 →", x);

x %= 3; 
console.log("x %= 3 →", x);

x **= 2;
console.log("x **= 2 →", x);
console.log();

let y = 5;
console.log("Increment / Decrement (starting y = 5):");

console.log("y++ =", y++); 
console.log("after y++ →", y);

console.log("++y =", ++y); 
console.log("after ++y →", y);

console.log("y-- =", y--); 
console.log("after y-- →", y);

console.log("--y =", --y);
console.log("after --y →", y);
