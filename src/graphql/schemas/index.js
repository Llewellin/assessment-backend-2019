import Incident from './Incident';
import User from './User';

const def = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
        users(query: String): [User!]!
    }
`

const typeDef = `${def}${Incident}${User}`

export {
    typeDef as default
}