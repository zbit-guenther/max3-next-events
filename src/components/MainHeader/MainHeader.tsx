import Link from 'next/link'
import s from './MainHeader.module.css'

export const MainHeader = () => {
  return (
    <header className={s.header}>
      <div className={s.logo}>
        <Link href="/">NextEvents</Link>
      </div>
      <nav className={s.navigation}>
        <Link href="/events">Browse All Events</Link>
      </nav>
      <nav className={s.navigation}>
        <Link href="/feedback">Feedback</Link>
      </nav>
    </header>
  )
}