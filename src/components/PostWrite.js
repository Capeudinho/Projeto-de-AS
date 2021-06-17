import React, {useState, useContext} from "react";
import {Redirect} from "react-router-dom";
import api from "../services/api";

import loggedUserContext from "./contexts/loggedUser";

import "../css/postWrite.css";

function PostWrite ()
{
    const {loggedUser, setLoggedUser} = useContext (loggedUserContext);
    const [title, setTitle] = useState ("");
    const [text, setText] = useState ("");
    const [validTitle, setValidTitle] = useState (true);
    const [validText, setValidText] = useState (true);
    const [message, setMessage] = useState ("");
    const [redirect, setRedirect] = useState (<></>);

    function checkTitle (title)
    {
        if (title.length > 0)
        {
            setValidTitle (true);
            return true;
        }
        setValidTitle (false);
        return false;
    }

    function checkText (text)
    {
        if (text.length > 0)
        {
            setValidText (true);
            return true;
        }
        setValidText (false);
        return false;
    }

    function handleChangeTitle (e)
    {
        checkTitle (e.target.value);
        setTitle (e.target.value);
    }

    function handleChangeText (e)
    {
        checkText (e.target.value);
        setText (e.target.value);
    }

    async function handlePost ()
    {
        if (checkTitle (title) && checkText (text))
        {
            const response = await api.post
            (
                "/postcreate",
                {
                    title,
                    text,
                    owner: loggedUser._id
                }
            );
            if (response.data !== null)
            {
                setRedirect (<Redirect to = {"/post/"+response.data._id}/>);
            }
        }
        else
        {
            setMessage ("One or more fields are invalid.")
        }
    }

    return (
        <div className = "postWriteArea">
            <div className = "label">Title</div>
            <input
            className = "titleInput"
            placeholder = "Title"
            value = {title}
            style = {{borderColor: validTitle ? "#cccccc" : "#cc5151"}}
            onChange = {(e) => {handleChangeTitle (e)}}
            />
            <div className = "label">Text</div>
            <textarea
            className = "textInput"
            placeholder = "Text"
            value = {text}
            style = {{borderColor: validText ? "#cccccc" : "#cc5151"}}
            rows = "10"
            onChange = {(e) => {handleChangeText (e)}}
            />
            <button
            className = "postButton"
            onClick = {() => {handlePost ()}}
            >
                Post
            </button>
            <div className = "message">{message}</div>
            {redirect}
        </div>
    )
}

export default PostWrite;