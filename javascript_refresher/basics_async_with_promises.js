// Set timeout to execute after a certain time
// Asynchronous
setTimeout(() => {
    console.log("Timer is done!")
    // Passing a function to 'fetchDate()'
    fetchData().then(text => {
        console.log(text)
    })
}, 2000);

const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Done!")
        }, 1500);
    });
    return promise;
};

// Synchronous
console.log("Hello")