import Incident from './Incident';
import User from './User';

const def = `
    type Query {
        users(name: String): [User!]!
        incidents(title: String): [Incident!]!
    }
    type Mutation {
        createUser(data: CreateUserInput!): User!
        createIncident(data: CreateIncidentInput!): Incident!
        assignIncident(data: AssignIncidentInput!): Incident!
        acknowledgeIncident(title: String!): Incident!
        resolveIncident(title: String!): Incident!
        deleteIncident(title: String!): Incident!
    }
    input CreateUserInput {
        name: String!
        email: String!
        role: String!
    }
    input CreateIncidentInput {
        title: String!
        description: String!
        assignee: String!
        status: String!
    }
    input AssignIncidentInput {
        userName: String!
        incidentTitle: String!
    }
`

const typeDef = `${def}${Incident}${User}`
module.exports = typeDef
