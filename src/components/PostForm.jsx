import React, { useState } from 'react'
import MyButton from '../UI/buttons/MyButton'
import MyInput from '../UI/inputs/MyInput'

export default function PostForm({create}) {

    const [post, setPost] = useState({title:"", body:""})

    const addNewPost = (e)=>{
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }

        create(newPost)
        setPost({title:"", body:""})
    
    }

    return (
        <form>

        <MyInput
            type = "text" 
            placeholder={"Название поста"}
            onChange = {e=>setPost({...post, title:e.target.value})}
            value = {post.title} 
         />



        <MyInput
            onChange = {e=>setPost({...post, body:e.target.value})}
            type = "text" 
            placeholder={"Описание поста"}
            value = {post.body}
        />


        <MyButton onClick={addNewPost}>Добавить</MyButton>
    </form>
    )
}
