import { PropsWithChildren } from 'react';
import s from './ErrorAlert.module.css';

interface Props {}
export const ErrorAlert = ({ children }: PropsWithChildren<Props>) => {
  return (
    <div className={s.alert}>
      {children}
    </div>
  )
}