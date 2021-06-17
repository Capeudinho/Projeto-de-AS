const User = require ("../models/User");

module.exports =
{

    async idRead (request, response)
    {
        const {_id} = request.query;
        const user = await User.findById (_id);
        return response.json (user);
    },

    async loginRead (request, response)
    {
        const {name, password} = request.query;
        const user = await User.findOne ({name, password});
        return response.json (user);
    },

    async create (request, response)
    {
        const {name = "", password = ""} = request.body;
        const user = await User.findOne ({name});
        if (user === null)
        {
            var newUser = await User.create ({name, password});
        }
        return response.json (newUser);
    },

    async idUpdate (request, response)
    {
        const {_id} = request.query;
        const {name = "", password = ""} = request.body;
        const newUser = await User.findByIdAndUpdate (_id, {name, password}, {new: true});
        return response.json (newUser);
    }
};