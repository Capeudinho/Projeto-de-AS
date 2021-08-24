const {Router} = require ("express");
const UserService = require ("../services/userService");

const userService = new UserService ();
const userRoutes = Router ();

userRoutes.get
(
    "/userread",
    async (request, response) =>
    {
        var users = await userService.read ();
        response.json (users);
    }
);

userRoutes.get
(
    "/useridread",
    async (request, response) =>
    {
        const {_id} = request.query;
        var user = await userService.idRead (_id);
        response.json (user);
    }
);

userRoutes.get
(
    "/userloginread",
    async (request, response) =>
    {
        const {name, password} = request.query;
        var user = await userService.loginRead (name, password);
        response.json (user);
    }
);

userRoutes.post
(
    "/usercreate",
    async (request, response) =>
    {
        const {name, password} = request.body;
        var newUser = await userService.create (name, password);
        response.set ("uri", "http://localhost:3333/useridread?_id="+newUser._id);
        response.json (newUser);
    }
);

userRoutes.put
(
    "/useridupdate",
    async (request, response) =>
    {
        const {_id} = request.query;
        const {name, password} = request.body;
        var newUser = await userService.idUpdate (_id, name, password);
        response.set ("uri", "http://localhost:3333/useridread?_id="+newUser._id);
        response.json (newUser);
    }
);

userRoutes.delete
(
    "/useriddelete",
    async (request, response) =>
    {
        const {_id} = request.query;
        var oldUser = await userService.idDelete (_id);
        response.json (oldUser);
    }
);

module.exports = userRoutes;