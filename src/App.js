import "./styles/App.css"
import {useMemo, useState} from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./UI/select/MySelect";
import MyInput from "./UI/inputs/MyInput";
import PostFilter from "./UI/select/PostFilter";
import MyModal from "./UI/modal/MyModal";
import MyButton from "./UI/buttons/MyButton";
import { usePosts } from "./hooks/usePost";
function App() {
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sort:"", query:""})

    const [visible, setVisible] = useState(false)

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
            <PostList remove = {removePost} posts = {sortedAndSearchedPosts} name = "Название поста"/>
        


      </div>

  );
}

export default App;
