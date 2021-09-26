import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import PostService from '../API/postService'
import { useFetching } from '../hooks/useFetching'
import Loader from "../UI/loader/Loader"

export default function PostIdPage() {
    const params = useParams()
    const [comment, setComment] = useState([])
    const [post, setPost] = useState({})
    const [fetchPostById, isLoading, error] = useFetching(async(id)=>{
        const response = await PostService.getById(params.id)
        setPost(response.data)
    })

    const [fetchCommens, isComLoading, errorCom] = useFetching(async(id)=>{
        const response = await PostService.getCommentsPostId(params.id)
    
        setComment(response.data)
    })
    useEffect(()=>{
        fetchPostById(params.id)
        fetchCommens(params.id)
    },[])
   
    
    return (
        <div>
            Post page ID={params.id}
            {isLoading
            ?<Loader/>
            : <div>{post.id}. {post.title}</div>}
            <h1>Comments</h1>
            {isComLoading
            ?<Loader/>
            :<div>
                {comment.map(comm=>
                    <div key={comm.id} style={{marginTop:"15px"}}>
                        <h1>{comm.email}</h1>
                        <div>{comm.body}</div>
                    </div>)}
            </div>
        }
           
        </div>
    )
}
