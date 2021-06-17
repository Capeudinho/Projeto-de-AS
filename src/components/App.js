import React, {useState, useEffect, createContext} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import "../index.css"
import "../css/app.css"

import UserEnter from "./UserEnter";
import UserEdit from "./UserEdit";
import Navbar from "./Navbar";
import PostList from "./PostList";
import PostInfo from "./PostInfo";
import PostWrite from "./PostWrite";

import loggedUserContext from "./contexts/loggedUser";

function App ()
{
  const [loggedUser, setLoggedUser] = useState ({});
  const [redirect, setRedirect] = useState (<></>);

  useEffect
  (
    () =>
    {
      if (loggedUser.hasOwnProperty ("_id") === false && localStorage.getItem ("user") !== null)
      {
        const user = JSON.parse (localStorage.getItem ("user"));
        setLoggedUser (user);
      }
      else
      {
        setRedirect (<Redirect to = "/enter"/>);
      }
    },
    []
  )

  return (
    <div className = "App">
      <loggedUserContext.Provider value = {{loggedUser, setLoggedUser}}>
        <BrowserRouter>
          <Switch>
            <Route path = "/enter" component = {UserEnter}/>
            <>
              <Route path = "/" component = {Navbar}/>
              <div className = "bodyArea">
                <Switch>
                  <Route path = "/post/:id" component = {PostInfo}/>
                  <Route path = "/write" component = {PostWrite}/>
                  <Route path = "/user" component = {UserEdit}/>
                  <Route path = "/" component = {PostList}/>
                </Switch>
              </div>
            </>
          </Switch>
          {redirect}
        </BrowserRouter>
      </loggedUserContext.Provider>
    </div>
  );
}

export default App;