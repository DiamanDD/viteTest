import css from './Informer.module.css'
import { clsx } from 'clsx'

interface Props {
  message: string
  title: string
}

const getStatus = (status: string) => {
  return status.toLowerCase().startsWith('оплачен')
}
export const Informer = ({ message, title }: Props) => {
  return (
    <div className={css.container}>
      <div className={css.title}>{title}</div>
      <div className={clsx(css.message, { [css.done]: getStatus(message) })}>
        {message}
      </div>
    </div>
  )
}
