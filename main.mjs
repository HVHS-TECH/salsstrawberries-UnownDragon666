/***************************************************************/
// main.mjs
//
//
/***************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log(`%c  main.mjs  `, `color: ${COL_C}; background-color: ${COL_B}`);

import {
    fb_initialiseAndAuth, fb_write, fb_read, fb_sortedRead, fb_initialise, getAuth
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

    // Test if favorite fruit is a number, and makes sure it isn't
    const numberRegex = /[0-9]+$/;
    if (numberRegex.test(document.getElementById('favoriteFruit').value) === true) {
        alert('Fruit cannot be a number.');
        return;
    } else if (numberRegex.test(document.getElementById('name').value) === true) {
        alert('Name cannot be a number.');
        return;
    }

    fb_write({
        name: document.getElementById('name').value,
        // Ensure favorite fruit is lowercase, so the sorted read works correctly
        favoriteFruit: document.getElementById('favoriteFruit').value.toLowerCase(),
        fruitQuantity: parseInt(document.getElementById('fruitQuantity').value),
        age: parseInt(document.getElementById('age').value),
        gender: document.getElementById('gender').value,
        updatePermissiom: document.getElementById('updatePermissiom').checked
    });
}

window.email = () => {
    const auth = getAuth();
    if (!auth.currentUser) {
        console.log('No user logged in');
        throw new Error('No user logged in');
    }

    fb_read('salsStrawberrySaloon/users/' + auth.currentUser.uid).then((fbdata) => {
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
        // Display the top 5 favorite fruits
        document.getElementById('favoriteFruits').innerHTML = `
        <div id="favoriteFruits">
            <p>Top 5 favorite fruits:</p>
            <ul>
                <li>${fbdata[0]}</li>
                <li>${fbdata[1]}</li>
                <li>${fbdata[2]}</li>
                <li>${fbdata[3]}</li>
                <li>${fbdata[4]}</li>
            </ul>
        </div>
        `;
    }).catch((error) => {
        console.log(error);
    });
}

window.setup = () => {
    fb_initialise();
}

window.favoriteFruitFrequency = () => {
    fb_read('salsStrawberrySaloon/users').then((fbdata) => {
        // Make an array filled with the frequencies of favorite fruits {fruit: frequency}
        let frequencyObject = {};
        for (const key in fbdata) {
            if (fbdata[key].favoriteFruit in frequencyObject) {
                frequencyObject[fbdata[key].favoriteFruit] += 1;
            } else {
                frequencyObject[fbdata[key].favoriteFruit] = 1;
            }
        }

        // Sort the frequency table from most to least
        let frequencyArray = Object.entries(frequencyObject).sort((a, b) => b[1] - a[1]);

        frequencyArray = frequencyArray.map(([key, value]) => `${key}: ${value}`);

        console.log(frequencyArray);

        console.log(frequencyObject);

        // Display the frequency table  
        document.getElementById('favoriteFruits').innerHTML = `
        <div id="favoriteFruits">
            <p>Favorite fruit frequency:</p>
            <ul>
                ${
            // Take the frequency array, and iterate through each item, 
            // and display it, but wrapping it in <li> tags
            frequencyArray.map((item) => `<li>${item}</li>`).join('')
            }
            </ul>
        </div>
        `;
    }).catch((error) => {
        console.log(error);
    });
}