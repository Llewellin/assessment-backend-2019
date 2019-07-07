const { User, Incident } = require('./models')

async function seedUsers() {
  await User.deleteMany({})
  await Incident.deleteMany({})

  const user1 = new User({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Engineer'
  })

  const user2 = new User({
    name: 'Susanna',
    email: 'sss@example.com',
    role: 'Supervisor'
  })

  await user1.save()
  await user2.save()

  const incident1 = new Incident({
    title: 'AWS submit',
    description: 'woooow',
    assignee: 'John Doe',
    status: 'Created'
  })

  const incident2 = new Incident({
    title: 'Team Building',
    description: 'woooow',
    assignee: 'John Doe',
    status: 'Acknowledged'
  })

  const incident3 = new Incident({
    title: 'Backlog Grooming',
    description: 'woooow',
    assignee: 'John Doe',
    status: 'Resolved'
  })

  const incident4 = new Incident({
    title: 'Team Building',
    description: 'woooow',
    assignee: 'Susanna',
    status: 'Acknowledged'
  })

  await incident1.save()
  await incident2.save()
  await incident3.save()
  await incident4.save()
  console.log('INFO: User DB seeded')
}

module.exports = {
  seedUsers
}
