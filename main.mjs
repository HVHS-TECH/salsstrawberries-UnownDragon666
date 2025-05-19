/***************************************************************/
// main.mjs
//
//
/***************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log(`%c  main.mjs  `, `color: ${COL_C}; background-color: ${COL_B}`);

import {
    fb_initialiseAndAuth, fb_write
}
    from './fb_io.mjs';

window.auth = fb_initialiseAndAuth;

window.submit = () => {
    // Check if user is logged in and firebase is initialised
    // if (!) {
    //     fb_initialiseAndAuth();
    // }
    fb_write({
        name: document.getElementById('name').value,
        favoriteFruit: document.getElementById('favoriteFruit').value,
        fruitQuantity: parseInt(document.getElementById('fruitQuantity').value),
        age: parseInt(document.getElementById('age').value),
        gender: document.getElementById('gender').value
    });
}