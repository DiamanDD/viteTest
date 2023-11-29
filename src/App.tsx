import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export const BASE_URL = "http://localhost"

function App() {
    const [count, setCount] = useState(0)
    const fetchData = async () => {
        fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                username: "john", password: "changeme"
            })
        }).then(res => res.json().then(result => localStorage.setItem("access_token", `Bearer ${result.access_token}`)).catch(erro => console.log(erro)))
    }
    const fetchData2 = async () => {
        const authorization = localStorage.getItem("access_token") || ''
        fetch(`${BASE_URL}/auth/profile`, {
            method: "GET",
            headers: {'content-type': 'application/json', authorization},
        }).then(res => res.json().then(result => console.log(result)).catch(erro => console.log(erro)))
    }
    useEffect(() => {
        fetchData2()
        fetchData()
        fetchData2()


    }, []);
    return (
        <>
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
        </>
    )
}

export default App
