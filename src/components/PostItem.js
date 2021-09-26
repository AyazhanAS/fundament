import React from 'react';
import { useHistory } from 'react-router';
import MyButton from '../UI/buttons/MyButton';

function PostItem(props) {
    const router = useHistory()
  

    return (
        <div>
            <div className="post">
                <div className="post__content">
                    <strong>{props.one.id}. {props.one.title}</strong>
                    <div>
                        {props.one.body}
                    </div>

                </div>
                <div className="post__btns">
                    <MyButton onClick={()=>router.push(`/posts/${props.one.id}`)}>OPEN</MyButton>
                </div>
                <div className="post__btns">
                    <MyButton onClick={()=>props.remove(props.one)}>DELETE</MyButton>
                </div>
            </div>
        </div>
    );
}

export default PostItem;