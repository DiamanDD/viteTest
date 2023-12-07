import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export const BASE_URL = import.meta.env.VITE_BASE_URL_BACKEND

function App() {
    const [count, setCount] = useState(0)
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [isAuth, setIsAuth] = useState(false)
    const fetchData = async () => {
        fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                username: login, password: password
                //username: "admin", password: "admin"
            })
        }).then(res => res.json().then(result => {
            if (res.status === 200) {
                localStorage.setItem("access_token", `Bearer ${result.access_token}`)
                setIsAuth(true)
            } else {
                setMessage(result.message)
                setTimeout(() => setMessage(""), 5000)


            }
        }))

    }
    const getProfile = async () => {
        const authorization = localStorage.getItem("access_token") || ''
        fetch(`${BASE_URL}/auth/profile`, {
            method: "GET",
            headers: {'content-type': 'application/json', authorization},
        }).then((res) => {
            if (res.status === 200) {
                setIsAuth(true)
                res.json().then(result => console.log(result)).catch(erro => {
                    console.log(erro)
                })
            }

        })
    }
    const logOut = async () => {
        localStorage.removeItem("access_token")
        setIsAuth(false)

    }

    useEffect(() => {
        if (!isAuth) {
            getProfile()
        }

    }, []);

    return (
        <>

            {isAuth ? <>
                <div>
                    <a href="https://vitejs.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo"/>
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo"/>
                    </a>
                </div>
                <h1>Vite + React</h1>
                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button>
                    <p>
                        Edit <code>src/App.tsx</code> and save to test HMR
                    </p>
                </div>
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
                <button onClick={logOut}>Выход</button>
            </> : <> Логин<input value={login} onChange={(e) => setLogin(e.target.value)}/> <br/>
                Пароль<input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/> <br/>
                {message && <div>{message}</div>}
                <button onClick={fetchData}>Авторизация</button>
            </>}
        </>
    )
}

export default App
