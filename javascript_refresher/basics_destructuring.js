// Simple object
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

// Here the whole person object is being passed
const printName = (personData) => {
    console.log(personData.name)
}

printName(person)

// Use object destructuring

const destructuredMethodPrintName = ({ name }) => {
    console.log(name)
} 

destructuredMethodPrintName(person)

// Destructuring objects
const { name, age } = person

console.log(name, age)

// Destructuring arrays
const hobbies = ['Sports', 'Gaming'];
const [hobby1, hobby2] = hobbies

console.log(hobby1)
console.log(hobby2)