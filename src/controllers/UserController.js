const User = require ("../models/User");
const { idDelete } = require("./PostController");

module.exports =
{
    async read (request, response)
    {
        const users = await User.find ().lean ();
        return response.json (users);
    },

    async idRead (request, response)
    {
        const {_id} = request.query;
        const user = await User.findById (_id).lean ();
        return response.json (user);
    },

    async loginRead (request, response)
    {
        const {name, password} = request.query;
        const user = await User.findOne ({name, password}).lean ();
        return response.json (user);
    },

    async create (request, response)
    {
        const {name = "", password = ""} = request.body;
        const user = await User.findOne ({name});
        var newUser = null;
        if (user === null)
        {
            newUser = await User.create ({name, password});
            response.set ("uri", "http://localhost:3333/useridread?_id="+newUser._id);
        }
        return response.json (newUser);
    },

    async idUpdate (request, response)
    {
        const {_id} = request.query;
        const {name = "", password = ""} = request.body;
        const newUser = await User.findByIdAndUpdate (_id, {name, password}, {new: true}).lean ();
        response.set ("uri", "http://localhost:3333/useridread?_id="+_id);
        return response.json (newUser);
    },

    async idDelete (request, response)
    {
        const {_id} = request.query;
        const oldUser = await User.findByIdAndDelete (_id);
        return response.json (oldUser);
    }
};