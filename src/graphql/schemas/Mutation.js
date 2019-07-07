const Mutation = `
    type Mutation {
        createIncident(data: CreateIncidentInput!): Incident!
        assignIncident(data: AssignIncidentInput!): Incident!
        acknowledgeIncident(id: ID!): Incident!
        resolveIncident(id: ID!): Incident!
        deleteIncident(id: ID!): Incident!
    }`

module.exports = Mutation
