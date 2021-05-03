import Image from 'next/image'
import { Event } from '../../data'
import { LinkButton, AddressIcon, DateIcon, ArrowRightIcon } from '../'
import s from './EventItem.module.css'

interface Props {
  event: Event
}
export const EventItem = ({ event }: Props) => {

  const { id, title, description, image, location, date } = event
  const readableDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  
  const address = location.replace(', ', '\n')
  const link = `/events/${id}`
  return (
    <li className={s.item}>
      <Image src={'/' + image} alt={title} width={250} height={160} />

      <div className={s.content}>
        <div className={s.summary}> 
          <h2>{title}</h2>
          <div className={s.date}>
            <DateIcon />
            <time>{readableDate}</time>
          </div>
          <div className={s.address}>
            <AddressIcon />
            <address>{address}</address>
          </div>
        </div>
        <div className={s.actions}>
          <LinkButton link={link}>
            <span>Explore</span>
            <span className={s.icon}><ArrowRightIcon/></span>
          </LinkButton>
        </div>
      </div>
    </li>
  )
}