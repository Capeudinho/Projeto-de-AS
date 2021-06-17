const Post = require ("../models/Post");
const User = require ("../models/User");

module.exports =
{
    async idRead (request, response)
    {
        const {_id} = request.query;
        const post = await Post.findById (_id).lean ();
        const user = await User.findById (post.owner);
        post.ownerName = user.name;
        return response.json (post);
    },

    async read (request, response)
    {
        const posts = await Post.find ({}). lean ();
        for (var a = 0; a < posts.length; a++)
        {
            const user = await User.findById (posts[a].owner);
            posts[a].ownerName = user.name;
        }
        return response.json (posts);
    },

    async create (request, response)
    {
        const {title = "", text = "", owner = ""} = request.body;
        var newPost = await Post.create ({title, text, owner});
        return response.json (newPost);
    },

    async idUpdate (request, response)
    {
        const {_id} = request.query;
        const {title = "", text = ""} = request.body;
        const newPost = await Post.findByIdAndUpdate (_id, {title, text}, {new: true});
        return response.json (newPost);
    },

    async idDelete (request, response)
    {
        const {_id} = request.query;
        const post = await Post.findByIdAndDelete (_id);
        return response.json (post);
    },
};