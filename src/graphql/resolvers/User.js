const User = {
    posts(parent, args, { db }, info) {
        return 123
    },
    comments(parent, args, { db }, info) {
        return 456
    }
}

export { User as default }