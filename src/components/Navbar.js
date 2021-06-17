import React from "react";
import {Link} from "react-router-dom";

import "../css/navbar.css";

function Navbar ()
{
    return (
        <div className = "navbarArea">
            <Link to = "/">
                <button>Recent posts</button>
            </Link>
            <Link to = "/write">
                <button>Write post</button>
            </Link>
            <Link to = "/user">
                <button>Your account</button>
            </Link>
        </div>
    );
}

export default Navbar;