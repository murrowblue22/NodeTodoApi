const {SHA26} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!'

// bcrypt.genSalt(10, (err, salt) => {
//     if(err) {
//         console.log(err);
//     }
//     bcrypt.hash(password, salt, (err, hash) => {
//         if(err){
//             console.log(err);
//         }
//         console.log(hash);
//     });
// });

const hashedPassword = '$2a$10$bx8.g7WILr7KB.EOdWABeemNdv14OVRlRzPMqvYx/sbD1HFpzyiZ.'

bcrypt.compare('123!', hashedPassword, (err, res) => {
    if(err) {
        console.log(err);
    }
    
    console.log(res);
});


