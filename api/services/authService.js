const mongoose = require('mongoose');
const User = mongoose.model('user');

export const findById = (id,callback) => {

    User.findOne({
        id
    }).then((user)=>{

        if(user)
            return true;

        return null;

    })

}