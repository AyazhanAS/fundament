import "./styles/App.css"
import {useState} from "react";
import PostList from "./components/PostList";
import MyButton from "./UI/buttons/MyButton";
import MyInput from "./UI/inputs/MyInput";
import PostForm from "./components/PostForm";
function App() {
    const [posts, setPosts] = useState([
        {id:1, title:"JS", body:"description_one"},
        {id:2, title:"PHP", body:"description_two"},
    ]
    )

    const createPost = (newPost)=>{
        setPosts([...posts, newPost])
    }
    
   
    const removePost = (post)=>{
        setPosts(posts.filter(p=>p.id!==post.id))
    }
    




  return (
      <div className="App">
         <PostForm create={createPost}/>
         <hr style={{margin:"15px 0"}}/>
         <div>
             <select>
                 <option value="value1">По названию</option>
                 <option value="value1">По описанию</option>
             </select>
         </div>
         {
             posts.length!==0
             ?<PostList remove = {removePost} posts = {posts} name = "Название поста"/>
            :<h1 style={{textAlign:"center"}}>POST DO NOT FIND</h1>
         }
        


      </div>

  );
}

export default App;
