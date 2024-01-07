// Set timeout to execute after a certain time
// Asynchronous
setTimeout(() => {
    console.log("Timer is done!")
    // Passing a function to 'fetchDate()'
    fetchDate(text => {
        console.log(text)
    })
}, 2000)

// This method accepts one argument 'callback' and that is a function
const fetchDate = (callback) => {
    setTimeout(() => {
        callback("Done!")
    }, 1500);
}

// Synchronous
console.log("Hello")