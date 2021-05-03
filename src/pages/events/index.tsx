
import { getAllEvents, Event } from '../../data'
import { EventList, EventSearch } from '../../components'
import { useRouter } from 'next/router'

export async function getStaticProps() {
  const events = await getAllEvents()

  return { props: { events, revalidate: 60 } }
}

interface Props {
  events: Event[]
}
export default function AllEventsPage({ events }: Props) {
 
  const router = useRouter()

  const search = (year: string, month: string) => {
    router.push(`/events/${year}/${month}`)
  }
   
  return (
    <div>
      <h1>All Events</h1>
      <EventSearch onSearch={search} />
      <EventList events={events} />
    </div>
  )
}
