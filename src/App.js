import { useEffect, useState } from "react";
import { BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context";

import "./styles/App.css"
import Navbar from "./UI/navbar/Navbar";

function App() {

  useEffect(()=>{
    if(localStorage.getItem("auth")){
      setIsAuth(true)
    }
    setIsLoading(false)
  }, [])

  const [isLoading, setIsLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  return (
    <AuthContext.Provider  value={{
      isAuth,
      setIsAuth,
      isLoading

    }}>
        <BrowserRouter>
      <Navbar />
      <AppRouter/>

    </BrowserRouter>

    </AuthContext.Provider>

  


  );
}

export default App;
