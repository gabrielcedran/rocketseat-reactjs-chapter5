import {createServer, Model} from 'miragejs'

type User = {
    name: string;
    email: string;
    created_at: string;
}

export function makeServer() {
    const server = createServer({
        models: {
            user: Model.extend<Partial<User>>({})
        },

        routes() {
            // set up root path.
            this.namespace = 'api';

            // adds a delay to mirage's responses
            this.timing = 750; 

            // shorthands - it will return all the users that are in the db
            this.get('/users');
            this.post('/users');

            // after setting up mirage's routes, reset the namespace to not conflict with nextjs' api route
            // remember that nextjs supports endpoint definition and it also has the root path api (just create a api directory inside pages).
            // Another alternative could be using a different root path for mirage.
            this.namespace = '';
            // this config makes mirage to pass ahead requests that does not match with any of its paths
            // e.g /api/users -> mirage answers
            // /api/abc -> mirage evaluates and as nothing matches, pass it through.
            this.passthrough();
        }
    });

    return server;
}
