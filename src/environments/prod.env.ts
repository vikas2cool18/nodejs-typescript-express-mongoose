import {Environment} from './env';

export const ProdEnvironment : Environment= {
    db_url: 'mongodb+srv://test:mongodbuser@mongodbtrainingcluster-80cd4.mongodb.net/test?retryWrites=true&w=majority',
    jwt_secret: 'prodSecret'
};
