import css from './Informer.module.css'
import { clsx } from 'clsx'

interface Props {
  message: string
  title: string
}

const getStatus = (status: string) => {
  return status.toLowerCase().startsWith('оплачен')
}
const getStatusSborka = (status: string) => {
  return status.toLowerCase().startsWith('заказ передан на сборку')
}
const getStatusSborkaIdet = (status: string) => {
  return status.toLowerCase().startsWith('заказ собирается')
}
const getStatusSobrano = (status: string) => {
  return status.toLowerCase().startsWith('заказ собран')
}
const getStatusGotovaVidacha = (status: string) => {
  return status.toLowerCase().startsWith('готов к выдаче')
}
export const Informer = ({ message, title }: Props) => {
  return (
    <div className={css.container}>
      <div className={css.title}>{title}</div>
      <div
        className={clsx(css.message, {
          [css.done]: getStatus(message),
          [css.sborka]: getStatusSborka(message),
          [css.sborkaIdet]: getStatusSborkaIdet(message),
          [css.sobrano]: getStatusSobrano(message),
          [css.gotovaVidacha]: getStatusGotovaVidacha(message),
        })}
      >
        {message}
      </div>
    </div>
  )
}
