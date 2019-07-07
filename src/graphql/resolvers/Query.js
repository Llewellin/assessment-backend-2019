const { User, Incident } = require('../../models')

const Query = {
  async users() {
    return await User.find({})
  },
  async incident(_, args) {
    return await Incident.findById(args.id)
  },
  async incidents(_, args) {
    if (Object.keys(args).length === 0) return await Incident.find()

    const {
      filter = {},
      sort: { field, order } = { field: 'createdAt', order: 1 },
      pagination: { pageNo, pageSize } = { pageNo: 1, pageSize: 100 }
    } = args

    return await Incident.find(filter)
      .sort({ [field]: order })
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize)
  }
}

module.exports = Query
