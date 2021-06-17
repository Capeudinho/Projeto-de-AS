const {Router} = require ("express");

const UserController = require ("./controllers/UserController");
const PostController = require ("./controllers/PostController");

const routes = Router ();

routes.get ("/useridread", UserController.idRead);
routes.get ("/userloginread", UserController.loginRead);
routes.post ("/usercreate", UserController.create);
routes.put ("/useridupdate", UserController.idUpdate);

routes.get ("/postidread", PostController.idRead);
routes.get ("/postread", PostController.read);
routes.post ("/postcreate", PostController.create);

module.exports = routes;