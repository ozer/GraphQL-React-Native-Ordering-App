const mongoose = require('mongoose');
const User = mongoose.model('user');

export const getAuthenticatedUser = {

    resolverForQueries(context){
        return context.user.then((user)=>{
            if(!user){
                return Promise.reject('Unauthorized');                
            }
            return user;
        })
    }

}