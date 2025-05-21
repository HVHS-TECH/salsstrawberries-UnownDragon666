/***************************************************************/
// main.mjs
//
//
/***************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log(`%c  main.mjs  `, `color: ${COL_C}; background-color: ${COL_B}`);

import {
    fb_initialiseAndAuth, fb_write, fb_read
}
    from './fb_io.mjs';

window.auth = fb_initialiseAndAuth;


window.submit = () => {
    fb_write({
        name: document.getElementById('name').value,
        favoriteFruit: document.getElementById('favoriteFruit').value,
        fruitQuantity: parseInt(document.getElementById('fruitQuantity').value),
        age: parseInt(document.getElementById('age').value),
        gender: document.getElementById('gender').value
    });
}

window.email = () => {
    fb_read().then((fbdata) => {
        console.log(fbdata);
        document.getElementById('emailMessage').innerHTML = `
            <div id="emailMessage">
                <p>${fbdata.email}</p>
                <p>Hello, ${fbdata.name}</p>
                <p>This is Sal's Strawberry Saloon, reaching out about your car's extended insurance policy.</p>
            </div>
            `;
    }).catch((error) => {
        console.log(error);
    });
}