import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import css from './styles.module.css';
import {Button} from "./Button/Button.tsx";

export const BASE_URL = import.meta.env.VITE_BASE_URL_BACKEND;

const InfiniteTypingEffect: React.FC = () => {
    const [text, setText] = useState('');
    const fullText = 'Если Ваш заказ не найден,<br/>то скорее всего он обрабатывается!'; // Замените на свой текст
    const typingSpeed = 150; // Скорость печати (в миллисекундах)
    const stopDuration = 2000; // Длительность остановки после окончания текста (в миллисекундах)

    useEffect(() => {
        let currentIndex = 0;
        let isStopped = false;

        const updateText = () => {
            if (currentIndex <= fullText.length) {
                setText(fullText.substring(0, currentIndex));
                currentIndex++;
            } else if (!isStopped) {
                isStopped = true;
                setTimeout(() => {
                    isStopped = false;
                    currentIndex = 0;
                }, stopDuration);
            }
        };

        const intervalId = setInterval(updateText, typingSpeed);

        return () => clearInterval(intervalId);
    }, [fullText, typingSpeed, stopDuration]);

    return (
        <div className={css.containerError}>
            <div className={css.errorZakaz}>
                <span dangerouslySetInnerHTML={{__html: text}}/>
            </div>
        </div>
    );
};

function App() {
    const [zakaz, setZakaz] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsloading] = useState(false);

    const fetchData = async () => {
        setIsloading(true);
        fetch(`${BASE_URL}/auth/westenter`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                zakaz,
            }),
        }).then((res) => {
            res.json().then((result) => {
                if (result.statusCode) {
                    setMessage(result.message);
                } else {
                    setMessage(result.data);
                }
            });
        });

        setIsloading(false);
    };

    const clearMessage = () => {
        if (message) {
            setMessage('');
        }
    };
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        clearMessage();
        setZakaz(e.target.value);
    };
    const onCklick = () => {
        clearMessage();
        if (zakaz.length >= 10) {
            fetchData();
        } else {
            setMessage('Не верный номер заказа');
        }
    };

    return (
        <>
            <div>
<Button/>
            </div>

            <InfiniteTypingEffect/>
            <div className={css.container}>
                {message && <div className={css.statusZakaza}>{message}</div>}
                {isLoading && <div>...Загрузка</div>}
                <input value={zakaz} onChange={onChange} placeholder={'Введите номер своего заказа'}/>
                <button onClick={onCklick}>Узнать статус заказа</button>
            </div>
        </>
    );
}

export default App;
