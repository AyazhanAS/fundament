import "../styles/App.css"
import {useEffect, useMemo, useRef, useState} from "react";
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
import { useObserver } from "../hooks/useObserver";
import MySelect from "../UI/select/MySelect";
function Post() {
    const [fetchPosts, isPostLoading, postError] = useFetching(async()=>{
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers["x-total-count"]
        setTotalPages(getPageCount(totalCount, limit))

    })

    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sort:"", query:""})

    const [visible, setVisible] = useState(false)

    const [totalCount, setTotalCount] = useState(0)

    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(6)
    const [page, setPage] = useState(1)

    const lastElement = useRef()

   useObserver(lastElement, page < totalPages, isPostLoading,()=>{
       setPage(page+1)
   })

    const changePage = (page)=>{
        setPage(page)
    }
    
  

    useEffect(()=>{
        fetchPosts(limit, page)
    }, [page, limit])

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
         <MySelect
         value={limit}
         onChange={value=>setLimit(value)}
        defaultValue="Количество элементов на странице"
        options={
            [
                {value:5, name: "5"},
                {value:10, name:"10"},
                {value:15, name:"15"},
                {value:-1, name:"ALL"},
            ]
        }
         >
             
             
         </MySelect>
         {
             postError&&
             <h1>Прoизошла ошибка {postError}</h1>
         }
          <PostList remove = {removePost} posts = {sortedAndSearchedPosts} name = "Название поста"/>
          <div ref={lastElement} style={{height:"20px", background:"red"}}/>
         {isPostLoading &&
         <div style={{display:"flex", justifyContent:"center", marginTop:"50px"}}><Loader/></div>
        
         }
         
             <Pagination totalPages={totalPages} page={page} changePage={changePage}/>

      </div>

  );
}

export default Post;

