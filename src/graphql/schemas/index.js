import Incident from './Incident'
import User from './User'
import Query from './Query'
import Mutation from './Mutation'
import Input from './Input'

const typeDef = `${Incident}${User}${Query}${Mutation}${Input}`
module.exports = typeDef
