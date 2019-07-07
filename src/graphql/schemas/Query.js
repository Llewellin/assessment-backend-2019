const Query = `
    type Query {
        users(name: String): [User!]!
        incident(id: ID!): Incident
        incidents(filter: IncidentFilterInput, sort: IncidentSortInput, pagination: IncidentPageInput): [Incident!]!
    }`

module.exports = Query
