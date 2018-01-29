const mongoose = require('mongoose');
const User = mongoose.model('user');

export const findById = (id, callback) => {

    console.log("findById 1");

    User.findById({
        _id : '5a6f275c761f1d24e56b5da8'
    }).then((user) => {

        console.log("findById 2: "+JSON.stringify(user));

        if (user) {
            console.log("TRUE : "+JSON.stringify(user));
            return true;
        }

        return null;

    })

}