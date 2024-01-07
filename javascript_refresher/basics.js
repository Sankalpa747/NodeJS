// JavaScript primitive types vs referece types 
// Primitive types - Primitive values are simple and immutable data types. They are directly stored in the variable's location in memory. In JavaScript, there are six primitive data types.
//                   String / Number / Boolean / Undefined / Null / Symbol
// Reference types - Reference values, on the other hand, are objects and are stored as references in memory. Objects include arrays, functions, and user-defined objects. 
//                   When you work with reference values, be aware that changes made to the object through one reference will affect all references pointing to that object.


// Variables and functions
// 'var' is an old keywork and now we can use 'let' and 'const'
// 'var' defined variables are available everywhere
// 'let' defined variables are only accessed within the defined scope
// 'const' defined variables cannot be changed (Constants)
let name = "sunny";
let age = 28;
let hasHobbbies = true;

// Normal function
// 'this' refers to 'obj'
// Regular functions are suitable when you need dynamic this binding
// function summarizeUser(userName, userAge, userHasHobby) {
//     return ("Name is " + userName + ", age is " + userAge + " and has hobby: " + hasHobbbies);
// };

// Named function
// const summarizeUser = function(userName, userAge, userHasHobby) {
//     return ("Name is " + userName + ", age is " + userAge + " and has hobby: " + hasHobbbies);
// };

// Arrow function
// 'this' refers to the enclosing scope (possibly the global object)
// Arrow functions are useful when you want to maintain the lexical scope's this binding
const summarizeUser = (userName, userAge, userHasHobby) => {
    return ("Name is " + userName + ", age is " + userAge + " and has hobby: " + hasHobbbies);
};

console.log(summarizeUser(name, age, hasHobbbies));

// Arrow function with single line
const add = (a, b) => a + b;

console.log(add(1, 2));

// Arrow function with no argument
const random = () => 10;

console.log(random());