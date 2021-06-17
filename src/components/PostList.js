import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import api from "../services/api";

import "../css/postList.css";

function PostList ()
{
    const [posts, setPosts] = useState ([]);

    useEffect
    (
        () =>
        {
            let mounted = true;
            const runEffect = async () =>
            {
                const response = await api.get
                (
                    "/postread", {}
                );
                if (mounted)
                {
                    setPosts (response.data);
                }
            }
            runEffect();
            return (() => {mounted = false;});
        },
        []
    );

    return (
        <div className = "postListArea">
            {
                posts.map
                (
                    (post, index) =>
                    {
                        return (
                            <div className = "post" key = {index}>
                                <Link to = {"/post/"+post._id}>
                                    <div className = "title">{post.title}</div>
                                </Link>
                                <div className = "ownerName">Por {post.ownerName}</div>
                            </div>
                        );
                    }
                )
            }
        </div>
    )
}

export default PostList;