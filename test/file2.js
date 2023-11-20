// file2.js
import {addNumbers} from './file1.js';


// Use the imported function
const result = addNumbers(5, 3);
console.log('Imported function result ', result); // Output: 8



// This function will be called from html.

function call_this_function(){
  console.log("function called")
}

// Calling from file itself works Eg:

call_this_function();

window.call_this_function = call_this_function
// But calling from HTML will cause an error of Reference.