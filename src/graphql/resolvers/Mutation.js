const { ObjectId } = require('mongodb')
const { User, Incident } = require('../../models')

const Mutation = {
  async createIncident(_, { data }) {
    // If assignee specified
    if (data.assignee) {
      const existedUser = await User.find({ name: data.assignee })
      if (existedUser.length < 1)
        throw new Error(`user ${data.assignee} doesn't exist`)

      return await new Incident({ ...data, status: 'Created' }).save()
    }

    // If assignee NOT specified
    const firstEngineer = await User.findOne({ role: 'Engineer' })
    if (!firstEngineer)
      throw new Error(`No default engineer to do the work, please reassign `)
    return await new Incident({
      ...data,
      status: 'Created',
      assignee: firstEngineer.name
    }).save()
  },
  async assignIncident(
    _,
    {
      data: { userId, incidentId }
    }
  ) {
    const user = await User.findById(ObjectId(userId))
    const incident = await Incident.findById(ObjectId(incidentId))

    if (!user) throw new Error(`User with Id ${userId} doesn't exist`)
    if (!incident)
      throw new Error(`Incident with Id ${incidentId} doesn't exist`)

    return await Incident.findOneAndUpdate(
      { _id: ObjectId(incidentId) },
      { assignee: user.name },
      { new: true }
    )
  },
  async acknowledgeIncident(_, { id }) {
    const incident = await Incident.findById(ObjectId(id))

    if (!incident) throw new Error(`Incident with Id ${id} doesn't exist`)

    return await Incident.findOneAndUpdate(
      { _id: ObjectId(id) },
      { status: 'Acknowledged' },
      { new: true }
    )
  },
  async resolveIncident(_, { id }) {
    const incident = await Incident.findById(ObjectId(id))

    if (!incident) throw new Error(`Incident with Id ${id} doesn't exist`)

    return await Incident.findOneAndUpdate(
      { _id: ObjectId(id) },
      { status: 'Resolved' },
      { new: true }
    )
  },
  async deleteIncident(_, { id }) {
    const incident = await Incident.findById(ObjectId(id))

    if (!incident) throw new Error(`Incident with Id ${id} doesn't exist`)

    await Incident.deleteOne({ _id: ObjectId(id) })
    return incident
  }
}

module.exports = Mutation
