// Spread operator and rest operator looks same (...)
// The behavior changes on the context its being used
// It will be spread if its being used for pulling content 
// It will be rest if its being used to merge multiple arguments 


// This way is very difficult since more arguments means more code changes
const toArray = (arg1, arg2, arg3) => {
    return [arg1, arg2, arg3]
};

console.log(toArray(1, 2, 3))

// Using rest operator
const toArrayNew = (...args) => {
    return args;
}

console.log(toArrayNew(1, 2, 3, 4, 5, 6))