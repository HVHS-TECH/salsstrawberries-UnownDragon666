/***************************************************************/
// main.mjs
//
//
/***************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log(`%c  main.mjs  `, `color: ${COL_C}; background-color: ${COL_B}`);

import {
    fb_initialiseAndAuth, fb_write, fb_read, fb_sortedRead
}
    from './fb_io.mjs';

window.auth = fb_initialiseAndAuth;

window.submit = () => {
    // If any form data is null, then don't submit
    if (document.getElementById('name').value == '' ||
        document.getElementById('favoriteFruit').value == '' ||
        document.getElementById('fruitQuantity').value == '' ||
        document.getElementById('age').value == '' ||
        document.getElementById('gender').value == '') {
        alert('Please fill in all fields.');
        return;
    }

    fb_write({
        name: document.getElementById('name').value,
        favoriteFruit: document.getElementById('favoriteFruit').value,
        fruitQuantity: parseInt(document.getElementById('fruitQuantity').value),
        age: parseInt(document.getElementById('age').value),
        gender: document.getElementById('gender').value,
        updatePermissiom: document.getElementById('updatePermissiom').checked
    });
}

window.email = () => {
    fb_read().then((fbdata) => {
        console.log(fbdata);
        if (fbdata.updatePermissiom == true) {
            document.getElementById('emailMessage').innerHTML = `
            <div id="emailMessage">
                <p>From: Sal's Strawberry Saloon</p>
                <p>Hello, ${fbdata.name}</p>
                <p>This is Sal's Strawberry Saloon, reaching out about your car's extended insurance policy.</p>
                <p>Also, we are offering a deal on your favorite fruit: ${fbdata.favoriteFruit}</p>
                <p>You can get ${fbdata.fruitQuantity} servings per week for 27.3% more!</p>
                <p>Best regards, Sal's Strawberry Saloon</p>
            </div>
            `;
        } else {
            document.getElementById('emailMessage').innerHTML = `
            <div id="emailMessage">
                <p>You have not given us permission to send you emails.</p>
            </div>
            `;
        }
    }).catch((error) => {
        console.log(error);
    });
}

window.readFav = () => {
    fb_sortedRead('salsStrawberrySaloon/users', 'favoriteFruit', 5).then((fbdata) => {
        console.log(fbdata);
    });
}