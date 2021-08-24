const UserRepository = require ("../repositories/userRepository");

const userRepository = new UserRepository ();
const User = userRepository.getUser ();

class UserService
{
    async read ()
    {
        const users = await User.find ().lean ();
        return users;
    }

    async idRead (_id)
    {
        const user = await User.findById (_id).lean ();
        return user;
    }

    async loginRead (name, password)
    {
        const user = await User.findOne ({name, password}).lean ();
        return user;
    }

    async create (name, password)
    {
        const newUser = await User.create ({name, password});
        return newUser;
    }

    async idUpdate (_id, name, password)
    {
        const newUser = await User.findByIdAndUpdate (_id, {name, password}, {new: true}).lean ();
        return newUser;
    }

    async idDelete (_id)
    {
        const oldUser = await User.findByIdAndDelete (_id);
        return oldUser;
    }
}

module.exports = UserService;