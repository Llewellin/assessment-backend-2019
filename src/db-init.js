const { User, Incident } = require('./models')

async function seedUsers() {
  await User.deleteMany({});
  await Incident.deleteMany({})

  const user1 = new User({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Engineer'
  });

  const user2 = new User({
    name: 'Susanna',
    email: 'sss@example.com',
    role: 'Supervisor'
  });

  await user1.save();
  await user2.save();

  const incident1 = new Incident({
    title: 'AWS submit',
    description: 'woooow',
    assignee: 'John Doe',
    status: 'Created'
  })

  await incident1.save()
  console.log('INFO: User DB seeded')
}

module.exports = {
  seedUsers
}
