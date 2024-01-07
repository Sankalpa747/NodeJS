// Set timeout to execute after a certain time
// Asynchronous
setTimeout(() => {
    console.log("Timer is done!")
    // Passing a function to 'fetchDate()'
    fetchDate().then(text => {
        console.log(text)
    })
}, 2000)

// This method accepts one argument 'callback' and that is a function
const fetchDate = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Done!")
        }, 1500);
    });
    return promise;
}

// Synchronous
console.log("Hello")