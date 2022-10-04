import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../store/session"
export default function LoginFormPage() {
    const [credential, setCredential] = useState("")
    const [password, setPassword] = useState("")
    
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login({credential,password}))
    }
    return (
        <form onSubmit = {handleSubmit}>
            <label>username or email
                <input type="text" 
                value= {credential} 
                onChange={e => setCredential(e.target.value)}
                />
            </label>
            <label>Password
                <input type="password" 
                value= {password} 
                onChange={e => setPassword(e.target.value)}
                />
            </label>

            <button type="submit">Login</button>
        </form>
    )
}