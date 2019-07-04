const config           = require('config')
const express          = require('express')
const mongoose         = require('mongoose')
const { ApolloServer } = require('apollo-server-express')
mongoose.Promise       = global.Promise

const { seedUsers } = require('./db-init')
import resolvers from './graphql/resolvers/index'
import typeDefs from './graphql/schemas/index'
// Type definitions (schema)
// const typeDefs = `
//     type Query {
//         hello: String!
//         name: String!
//         location: String!
//         bio: String!
//     }
// `

mongoose.connect(config.get('db.uri'), { useNewUrlParser: true })
  .then(async () => {
    console.log('INFO: Connected to the database')

    await seedUsers()

    // TODO: Initialize Apollo with the required arguments as you see fit
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    })

    const app = express()
    server.applyMiddleware({ app })

    const { host, port } = config.get('server')

    app.listen({ port }, () => {
      console.log(`Server ready at http://${ host }:${ port }${ server.graphqlPath }`)
    })
  })
  .catch((error) => {
    console.error(error)
    process.exit(-1)
  })
