const mongoose = require ("mongoose");
const UserSchema = require ("../schemas/userSchema");

const User = mongoose.model ("User", UserSchema);

class UserRepository
{
    getUser ()
    {
        return User;
    }
}

module.exports = UserRepository;