import Link from 'next/link'
import { PropsWithChildren } from 'react'
import s from './Button.module.css'

interface Props {
  link: string
} 
export const LinkButton = ({ link, children }: PropsWithChildren<Props>) => {
  return(
    <Link href={link}>
      <a className={s.btn}>{children}</a>   
    </Link> 
  )
}