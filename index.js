import express from 'express';
import mongoose, { mongo } from 'mongoose';
import jwt from 'express-jwt'
import graphqlExpress  from 'express-graphql';
import bodyParser from 'body-parser';
import { JWT_SECRET, MONGO_URI, PORT } from './api/config';
import Promise from 'bluebird';
import models from './api/models';
import schema from './api/schema/schema';
import {authService,findById} from './api/services/authService';

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI);

mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));


const app = express();
app.use(bodyParser.json())

app.use('/graphql', jwt({
    secret: JWT_SECRET,
    credentialsRequired: false,
}), graphqlExpress((request, response, graphQLParams) => ({
    schema,
    graphiql : true,
    context : {
        user : request.user ? findById(request.user.id) :
        Promise.resolve(null),
        request : request,
        test : 'Example context value'
    }
})
)

);

/*
user : request.user ? user.findOne({ where: { id: request.user.id } }) :
        Promise.resolve(null),

*/

Promise.resolve()
    .then(() => console.log("server initiation"))
    .catch((err) => console.log("Server initiation has error" + err))
    .finally(() => app.listen(PORT));



