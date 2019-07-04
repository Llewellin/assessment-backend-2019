const userArray = [
    {
        id: '1',
        name: 'vincent',
        email: 'exsequens15@gmail.com',
        role: 'god'
    },
    {
        id: '2',
        name: 'junjun',
        email: 'junjun@gmail.com',
        role: 'pet'
    }
]

const Query = {
    hello() {
        return 'This is my first query!'
    },
    name() {
        return 'Andrew Mead'
    },
    location() {
        return 'Philadelphia'
    },
    bio() {
        return 'I live in Philly and teach on Udemy!'
    },
    users(parent, args, { db }, info) {
        return userArray
    },
}

export { Query as default }