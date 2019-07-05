const { User, Incident } = require('../../models')

const Mutation = {
    async createUser(parent, args, { db }, info) {
        const acceptedRole = ['Engineer', 'Supervisor']
        const iValidRole = acceptedRole.includes(args.data.role)
        if (!iValidRole) {
          throw new Error('Role must be one of type \'Engineer\' \'Supervisor\'')
        }

        const existedUser =  await User.find({email: args.data.email})
        if(existedUser.length > 0)
          throw new Error('Email taken')

        const user = {
            ...args.data
        }
        const newUser = new User(user);
        await newUser.save()

        return user
    },
    async createIncident(parent, args, { db }, info) {
      const acceptedStatus = ['Created', 'Acknowledged', 'Resolved']
      const iValidStatus = acceptedStatus.includes(args.data.status)
      if (!iValidStatus) {
        throw new Error('Status must be one of type \'Created\' \'Acknowledged\' \'Resolved\'')
      }

      const existedIncident = await Incident.find({title: args.data.title})
      if (existedIncident.length > 0)
        throw new Error('Title taken')

      const existedUser = await User.find({name: args.data.assignee})
      if (existedUser.length < 0)
        throw new Error(`user ${args.data.assignee} doesn't exist`)

      const isValidUser = existedUser[0].role === 'Engineer'
      if (!isValidUser)
        throw new Error('User must be an engineer')

      return await (new Incident({...args.data})).save()
    },
    async assignIncident(parent, args, { db }, info) {
      const existedUser = await User.find({name: args.data.userName})
      const existedIncident = await Incident.find({title: args.data.incidentTitle})

      if(existedUser.length < 0)
        throw new Error(`User ${args.data.userName} doesn't exist`)
      if(existedIncident.length < 0)
        throw new Error(`Incident ${args.data.incidentTitle} doesn't exist`)

      await Incident.findOneAndUpdate({title: args.data.incidentTitle}, {assignee: args.data.userName})

      return {
        title: existedIncident[0].title,
        description: existedIncident[0].description,
        assignee: args.data.userName,
        status: existedIncident[0].status,
      }
    },
    async acknowledgeIncident(parent, args, { db }, info) {
      const existedIncident = await Incident.find({title: args.title})

      if(existedIncident.length < 0)
        throw new Error(`Incident ${args.title} doesn't exist`)

      await Incident.findOneAndUpdate({title: args.title}, {status: 'Acknowledged'})

      return {
        title: existedIncident[0].title,
        description: existedIncident[0].description,
        assignee: existedIncident[0].assignee,
        status: 'Acknowledged',
      }
    },
    async resolveIncident(parent, args, { db }, info) {
      const existedIncident = await Incident.find({title: args.title})

      if(existedIncident.length < 0)
        throw new Error(`Incident ${args.title} doesn't exist`)

      await Incident.findOneAndUpdate({title: args.title}, {status: 'Resolved'})

      return {
        title: existedIncident[0].title,
        description: existedIncident[0].description,
        assignee: existedIncident[0].assignee,
        status: 'Resolved',
      }
    },
    async deleteIncident(parent, args, { db }, info) {
      const existedIncident = await Incident.find({title: args.title})

      if(existedIncident.length < 0)
        throw new Error(`Incident ${args.title} doesn't exist`)

      await Incident.deleteOne({title: args.title})

      return existedIncident[0]
    }
}

module.exports = Mutation
