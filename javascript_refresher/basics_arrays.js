// Define array
const hobbies = ['Sports', 'Gaming'];

// Add elements to the array
// SPECIAL NOTE:
// Array 'hobbies' is a const yet possible to edit. Why?
// Array is a reference type hence the variable holds the reference memory location and not the actual value
// Therefore, modifying the array doesn't change its memory location (Reference)
// Then its possible to modify the array
hobbies.push('Traveling');
hobbies.push('Programming')

// Map the values of the array, change it and then create a new array
const new_array = hobbies.map((hobby) => {
    return hobby.toUpperCase()
})

console.log(new_array)

// Loop through the array
for (let hobby of hobbies) {
    console.log(hobby)
} 