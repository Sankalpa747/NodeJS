// Define array
const hobbies = ['Sports', 'Gaming'];

// We can copy an array using the slice() too
//const new_array = hobbies.slice()

// Spread operator
// Just ... (Three dots) in front of arrays or objects
// What this operator does is..
// Take the array or object after the operator and pull out all the elements or properties, then put it what ever its surrounder with
const copiedArray = [...hobbies] 

console.log(copiedArray)

const person = {
    name:"Max",
    age:29,
    greet: function() {
        console.log("My name is: " + this.name);
    },
    greet_2() {
        console.log("My name is: " + this.name + ", from greet two");
    },
    greet_3: () => {
        console.log("My name is: " + this.name + ", from greet three");
    }
};


//Test the spread with objects
const copiedPerson = {...person}

console.log(copiedPerson);
copiedPerson.greet();
copiedPerson.greet_2();
copiedPerson.greet_3();
