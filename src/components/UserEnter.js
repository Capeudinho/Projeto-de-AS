import React, {useState, useEffect, useContext} from "react";
import {Redirect} from "react-router-dom";
import api from "../services/api";

import loggedUserContext from "./contexts/loggedUser";

import "../css/userEnter.css"

function UserEnter ()
{
    const {loggedUser, setLoggedUser} = useContext (loggedUserContext);
    const [name, setName] = useState ("");
    const [password, setPassword] = useState ("");
    const [validName, setValidName] = useState (true);
    const [validPassword, setValidPassword] = useState (true);
    const [showPassword, setShowPassword] = useState (false);
    const [message, setMessage] = useState ("");
    const [redirect, setRedirect] = useState (<></>);

    function checkName (name)
    {
        if (name.length > 0)
        {
            setValidName (true);
            return true;
        }
        setValidName (false);
        return false;
    }

    function checkPassword (password)
    {
        if (password.length > 0)
        {
            setValidPassword (true);
            return true;
        }
        setValidPassword (false);
        return false;
    }

    function handleChangeName (e)
    {
        checkName (e.target.value);
        setName (e.target.value);
    }

    function handleChangePassword (e)
    {
        checkPassword (e.target.value);
        setPassword (e.target.value);
    }

    async function handleSignUp ()
    {
        if (checkName (name) && checkPassword (password))
        {
            const response = await api.post
            (
                "/usercreate",
                {
                    name,
                    password
                }
            );
            if (response.data === "")
            {
                setMessage ("An user with this name already exists.");
            }
            else
            {
                localStorage.setItem ("user", JSON.stringify (response.data));
                setLoggedUser (response.data);
                setRedirect (<Redirect to = "/"/>);
            }
        }
        else
        {
            setMessage ("One or more fields are invalid.")
        }
    }

    async function handleLogIn ()
    {
        const response = await api.get
        (
            "/userloginread",
            {
                params:
                {
                    name: name,
                    password: password
                }
            }
        );
        if (response.data === null)
        {
            setMessage ("One or more fields are incorrect.");
        }
        else
        {
            localStorage.setItem ("user", JSON.stringify (response.data));
            setLoggedUser (response.data);
            setRedirect (<Redirect to = "/"/>);
        }
    }

    return (
        <div className = "userEnterArea">
            <div className = "label">Name</div>
            <input
            className = "nameInput"
            placeholder = "Name"
            value = {name}
            style = {{borderColor: validName ? "#cccccc" : "#cc5151"}}
            onChange = {(e) => {handleChangeName (e)}}
            />
            <div className = "label">Password</div>
            <div className = "passwordInputGroup">
                <input
                className = "passwordInput"
                placeholder = "Password"
                value = {password}
                type = {showPassword ? "text" : "password"}
                style = {{borderColor: validPassword ? "#cccccc" : "#cc5151"}}
                onChange = {(e) => {handleChangePassword (e)}}
                />
                <button
                className = "showPasswordButton"
                style =
                {
                    {
                        backgroundColor: showPassword ? "#b2b2b2" : "#cccccc",
                        borderColor: showPassword ? "#b2b2b2" : "#cccccc"
                    }
                }
                onClick = {() => {setShowPassword (!showPassword)}}
                >
                    Show
                </button>
            </div>
            <button
            className = "signUpButton"
            onClick = {() => {handleSignUp ()}}
            >
                Sign up
            </button>
            <button
            className = "logInButton"
            onClick = {() => {handleLogIn ()}}
            >
                Log in
            </button>
            <div className = "message">{message}</div>
            {redirect}
        </div>
    );
}

export default UserEnter;