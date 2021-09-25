import "../styles/App.css"
import {useEffect, useMemo, useState} from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../UI/select/PostFilter";
import MyModal from "../UI/modal/MyModal";
import MyButton from "../UI/buttons/MyButton";
import { usePosts } from "../hooks/usePost";

import PostService from "../API/postService"
import Loader from "../UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount} from "../utils/pages";
import Pagination from "../UI/pagination/Pagination";
function Post() {
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sort:"", query:""})

    const [visible, setVisible] = useState(false)

    const [totalCount, setTotalCount] = useState(0)

    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(6)
    const [page, setPage] = useState(1)

    const changePage = (page)=>{
        setPage(page)
    }


    useEffect(()=>{
        fetchPosts()
    }, [page])

    const [fetchPosts, isPostLoading, postError] = useFetching(async()=>{
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        const totalCount = response.headers["x-total-count"]
        setTotalPages(getPageCount(totalCount, limit))

    })

    console.log(totalPages);

    const createPost = (newPost)=>{
        setPosts([...posts, newPost])
        setVisible(false)
    }
    
  
   
    const removePost = (post)=>{
        setPosts(posts.filter(p=>p.id!==post.id))
    }
    
   

   const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const openModal = ()=>{
        setVisible(true)

    }


   

  return (
      <div className="App">
          <MyButton style={{marginTop:"30px"}} onClick={openModal}>Add element</MyButton>
          <MyModal visible={visible} setVisible={setVisible}>
            <PostForm create={createPost}/>
          </MyModal>
        
         <hr style={{margin:"15px 0"}}/>
         <div>
          <PostFilter filter={filter} setFilter={setFilter}/>
         </div>
         {
             postError&&
             <h1>Прщйзошла ошибка {postError}</h1>
         }
         {isPostLoading
         ?<div style={{display:"flex", justifyContent:"center", marginTop:"50px"}}><Loader/></div>
         :<PostList remove = {removePost} posts = {sortedAndSearchedPosts} name = "Название поста"/>
         }
         
             <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
            
        


      </div>

  );
}

export default Post;

