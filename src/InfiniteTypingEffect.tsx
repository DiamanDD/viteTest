import React, { useEffect, useState } from 'react'
import css from './styles.module.css'

export const InfiniteTypingEffect: React.FC = () => {
  const [text, setText] = useState('')
  const fullText =
    'Если Ваш заказ не найден, то скорее всего он обрабатывается!' // Замените на свой текст
  const typingSpeed = 150 // Скорость печати (в миллисекундах)
  const stopDuration = 2000 // Длительность остановки после окончания текста (в миллисекундах)

  useEffect(() => {
    let currentIndex = 0
    let isStopped = false

    const updateText = () => {
      if (currentIndex <= fullText.length) {
        setText(fullText.substring(0, currentIndex))
        currentIndex++
      } else if (!isStopped) {
        isStopped = true
        setTimeout(() => {
          isStopped = false
          currentIndex = 0
        }, stopDuration)
      }
    }

    const intervalId = setInterval(updateText, typingSpeed)

    return () => clearInterval(intervalId)
  }, [fullText, typingSpeed, stopDuration])

  return (
    <div className={css.containerError}>
      <div className={css.errorZakaz}>
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  )
}
