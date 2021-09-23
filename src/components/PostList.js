import React from 'react';
import PostItem from "./PostItem";

function PostList({posts, name, remove}) {

    return (
        <div>
            <h1 style={{textAlign:"center"}}>{name}</h1>
            {posts.map((one, index ) =>
                <PostItem remove={remove} number = {index + 1} key = {one.id} one = {one}/>
            )
            }

        </div>
    );
}

export default PostList;