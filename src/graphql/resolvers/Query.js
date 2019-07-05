const { User, Incident } = require('../../models')

const Query = {
    async users(parent, args, { db }, info) {
      if (!args.name) {
        return await User.find()
      }

      return await User.find({name: args.name})
    },
    async incidents(parent, args, { db }, info) {
      if (!args.title)
        return await Incident.find()

      return await Incident.find({title: args.name})
    }
}

module.exports = Query
