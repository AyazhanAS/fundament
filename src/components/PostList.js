import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PostItem from "./PostItem";

function PostList({posts, name, remove}) {

    if(!posts.length){
        return(
            <h1 style={{textAlign:"center"}}>
                POST DON`T FIND!
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign:"center"}}>{name}</h1>
            <TransitionGroup>
            {posts.map((one, index ) =>
        
            <CSSTransition
            key={one.id}
            timeout={500}
            classNames="post"
          >
                <PostItem remove={remove} number = {index + 1} one = {one}/>
                </CSSTransition>
            )
            }
            </TransitionGroup>

        </div>
    );
}

export default PostList;