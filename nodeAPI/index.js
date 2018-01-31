import express from 'express';
import mongoose, { mongo } from 'mongoose';
import jwt from 'express-jwt'
import graphqlExpress from 'express-graphql';
import bodyParser from 'body-parser';
import { JWT_SECRET, MONGO_URI, PORT } from './api/config';
import Promise, { reject } from 'bluebird';
import models from './api/models';
import schema from './api/schema/schema';

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI);

const User = mongoose.model('user');

mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));


const app = express();
app.use(bodyParser.json())

app.use('/graphql', jwt({
    secret: JWT_SECRET,
    credentialsRequired: false,
}), graphqlExpress((request, response, graphQLParams) => {
    console.log(request.headers);
    return {
        schema,
        graphiql: true,
        context: {
            request: request,
            user: request.user ? User.findById(request.user.id) :
                Promise.resolve(null),
            test: 'Example context value'
        }
    }
})
)

/*
user : request.user ? user.findOne({ where: { id: request.user.id } }) :
        Promise.resolve(null),

*/

Promise.resolve()
    .then(() => console.log("server initiation"))
    .catch((err) => console.log("Server initiation has error" + err))
    .finally(() => app.listen(PORT));



