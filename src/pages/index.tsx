import Head from 'next/head'
import { EventList } from '../components'
import { Event, getFeaturedEvents } from '../data'

interface Props {
  events: Event[]
}
export default function  HomePage({ events }: Props) {
 
  return (
    <>
      <Head>
        <title>Events</title>
      </Head>
      <div>
        <h1>Featured Events</h1>
        <EventList events={events} />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const events = await getFeaturedEvents()
  
  return { props: { events } } 
}