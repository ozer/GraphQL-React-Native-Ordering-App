const mongoose = require('mongoose');
const User = mongoose.model('user');

export const findById = (id, callback) =>{

    console.log("Id from authService : "+id);

    console.log("sadas : "+User.findById({ _id: id }))

    User.findById({ _id: id }).then((user)=>{

        console.log("asdasd");

        return user;

    })

}

export const getAuthenticatedUser = (context) => {

    return context.request.user ? context.request.user : null

}