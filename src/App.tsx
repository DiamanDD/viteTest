import {ChangeEvent, useState} from 'react'
import './App.css'
import css from "./styles.module.css"

export const BASE_URL = import.meta.env.VITE_BASE_URL_BACKEND

function App() {
    const [zakaz, setZakaz] = useState("")
    const [message, setMessage] = useState("")
    const [isLoading, setIsloading] = useState(false)

    const fetchData = async () => {
        setIsloading(true)
        fetch(`${BASE_URL}/auth/westenter`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                zakaz
            })
        }).then(res => {
            res.json().then(result => {
                if (result.statusCode) {
                    setMessage(result.message)

                } else {
                    setMessage(result.data)

                }
            })
        })

        setIsloading(false)
    }

    const clearMessage = () => {
        if (message) {
            setMessage("")
        }
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        clearMessage()
        setZakaz(e.target.value)
    }
    const onCklick = () => {
        clearMessage()
        if (zakaz.length >= 10) {
            fetchData()
        } else {
            setMessage("Не верный номер заказа")
        }
    }

    return (
        <div className={css.container}>
            <div>test</div>
            {message && <div>{message}</div>}
            {isLoading && <div>...Загрузка</div>}
            <input value={zakaz} onChange={onChange}/>
            <button onClick={onCklick}>Узнать статус заказа</button>
        </div>
    )
}

export default App
