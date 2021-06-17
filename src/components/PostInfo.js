import React, {useState, useEffect} from "react";

import api from "../services/api";

import "../css/postInfo.css";

function PostInfo ({match})
{
    const [post, setPost] = useState ({});

    useEffect
    (
        () =>
        {
            let mounted = true;
            const runEffect = async () =>
            {
                const response = await api.get
                (
                    "/postidread",
                    {
                        params:
                        {
                            _id: match.params.id
                        }
                    }
                );
                if (mounted)
                {
                    setPost (response.data);
                }
            }
            runEffect();
            return (() => {mounted = false;});
        },
        [match]
    );

    return (
        <div className = "postInfoArea">
            <div className = "title">{post.title}</div>
            <div className = "text">{post.text}</div>
            <div className = "ownerName">Por {post.ownerName}</div>
        </div>
    )
}

export default PostInfo;