import { Event } from '../../data'
import { EventItem } from '../EventItem'
import styles from './EventList.module.css'

interface Props {
  events: Event[]
}
export const EventList = ({ events }: Props) => {
  return (
    <ul className={styles.list}>
      {events.map(event => <EventItem key={event.id} event={event} />)}
    </ul>
  )
}