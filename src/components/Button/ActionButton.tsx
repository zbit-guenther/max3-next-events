import { MouseEventHandler, PropsWithChildren } from 'react'
import s from './Button.module.css'

interface Props {
  action: (e: any) => void
} 
export const ActionButton = ({ action, children }: PropsWithChildren<Props>) => {
  return(
    <div className={s.action}>
    <button onClick={action} className={s.btn}>
      {children}
    </button>   
    </div>
  )
}