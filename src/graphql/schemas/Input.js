const Input = `
    enum IncidentStatusTypes { 
      Created
      Acknowledged
      Resolved 
    }
    input CreateUserInput {
        name: String!
        email: String!
        role: String!
    }
    input CreateIncidentInput {
        title: String!
        description: String
        assignee: String
    }
    input AssignIncidentInput {
        userId: ID!
        incidentId: ID!
    }
    input IncidentFilterInput {
        title: String
        description: String
        status: IncidentStatusTypes
    }
    input IncidentSortInput {
        field: String
        order: Int
    }
    input IncidentPageInput {
        pageNo: Int
        pageSize: Int
    }`

module.exports = Input
