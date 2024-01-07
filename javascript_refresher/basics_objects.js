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

console.log(person);
person.greet();
person.greet_2();
person.greet_3();
