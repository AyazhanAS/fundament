import React, { useContext } from 'react'
import { AuthContext } from '../context'
import MyButton from '../UI/buttons/MyButton'
import MyInput from '../UI/inputs/MyInput'

export default function Login() {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const submit = event=>{
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem("auth", "true")
    }
    return (
        <div>
            <h1>Page login</h1>
            <form onSubmit={submit}> 
                <MyInput type="text" placeholder="Enter login"/>
                <MyInput type="password" placeholder="Enter password"/>
                <MyButton>LOG IN</MyButton>
            </form>
        </div>
    )
}
