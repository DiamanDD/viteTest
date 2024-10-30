import { ChangeEvent, useState } from 'react'
import 'dayjs/locale/ru'
import { isEmpty } from 'lodash'
import './App.css'
import css from './styles.module.css'
import { InfiniteTypingEffect } from './InfiniteTypingEffect.tsx'
import { ReadMore } from './ReadMore/ReadMore.tsx'
import { getStatusDone, Informer } from './Informer/Informer.tsx'
import dayjs from 'dayjs'

dayjs.locale('ru')

export const BASE_URL = import.meta.env.VITE_BASE_URL_BACKEND

interface Deadline {
  'startDate': number,
  'deadline': number,
  'withTime': false
}

function App() {
  const [zakaz, setZakaz] = useState('')
  const [reason, setReason] = useState('')
  const [deadline, setDeadline] = useState<Deadline>({} as Deadline)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [tk, setTk] = useState('')
  const [trackNumber, setTrackNumber] = useState('')
  const [isLoading, setIsloading] = useState(false)

  const fetchData = async () => {
    setIsloading(true)
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
        setIsloading(false)
        if (result.statusCode) {
          setError(result.message)
        } else {
          setMessage(result.status)
          setTk(result.stiker)
          if (result.trackNumber) {
            setTrackNumber(result.trackNumber)
          }
          if (result.reason) {
            setReason(result.reason)
          }
          if (result.deadline) {
            setDeadline(result.deadline)
          }
        }
      })
    })
  }

  const clearMessage = () => {
    if (message || error) {
      setMessage('')
      setTk('')
      setTrackNumber('')
      setError('')
      setDeadline({} as Deadline)
      setReason('')
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
      setError('Не верный номер заказа')
    }
  }
  return (
    <div className={css.container}>
      <div>
        <ReadMore />
      </div>
      {!message && (
        <div className={css.containerText}>
          <InfiniteTypingEffect />
        </div>
      )}
      <div className={css.messageContainer}>
        {error && <Informer title={'Статус'} message={error} />}
        {message && <Informer title={'Статус'} message={message} />}
        {tk && <Informer title={'Вы выбрали для доставки'} message={tk} />}
        {trackNumber && <Informer title={'Трек номер'} message={trackNumber} />}
        {!getStatusDone(message) && <>
          {!isEmpty(deadline) &&
            <Informer title={'Планируемая дата отгрузки'}
                      message={`C ${dayjs(deadline.startDate).format('D MMMM')} по ${dayjs(deadline.deadline).format('D MMMM')}`}
                      status={'error'} />}
          {reason && <Informer title={'Причина задержки отгрузки'} message={reason} status={'error'} />}
        </>}

        {isLoading && <div className={css.loader}>...Загрузка</div>}
        <input
          value={zakaz}
          onChange={onChange}
          placeholder={'Введите номер своего заказа'}
        />
        <button onClick={onCklick}>Узнать статус заказа</button>
      </div>
    </div>
  )
}

export default App
