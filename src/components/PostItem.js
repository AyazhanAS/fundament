import React from 'react';
import MyButton from '../UI/buttons/MyButton';

function PostItem(props) {

    return (
        <div>
            <div className="post">
                <div className="post__content">
                    <strong>{props.number}. {props.one.title}</strong>
                    <div>
                        {props.one.body}
                    </div>

                </div>
                <div className="post__btns">
                    <MyButton onClick={()=>props.remove(props.one)}>DELETE</MyButton>
                </div>
            </div>
        </div>
    );
}

export default PostItem;