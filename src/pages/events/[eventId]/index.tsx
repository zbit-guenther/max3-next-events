import { useRouter } from 'next/router'
import Image from 'next/image'
import { Event, getFeaturedEvents, getEventById } from '../../../data'
import { AddressIcon, DateIcon, ErrorAlert } from '../../../components'
import s from './content.module.css'
import l from './logistics.module.css'
import Head from 'next/head'

export async function getStaticPaths() {
  const events = await getFeaturedEvents()
  const paths = []
  events.map(e => paths.push({ params: { eventId: e.id } }))
  return (
    {
      paths,
      fallback: true
    }
  )
  // only the featured events pages are pre-rendered, 
  // the rest will rendered when loaded (fallback: true)
}

export async function getStaticProps(context) {
  const id = context.params.eventId
  const event = await getEventById(id)
  if (event) {
    return { props: { event }}
  } 
}

interface Props {
  event: Event
}
export default function EventDetailPage({ event }: Props) {
  const router = useRouter()
  const id = router.query.eventId 
  
  if (!event) {
    return (
      <div className="center">
        Loading ...
      </div>
    )
  }
  const { date, location, image, title, description } = event;
  const humanReadableDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const address = location.replace(', ', '\n');

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta 
          name="description"
          content={description}
        />
      </Head>
      <section className={s.summary}>
        <h1>{title}</h1>
      </section>
      <section className={l.logistics}>
        <div className={l.image}>
          <Image src={`/${image}`} alt={title} width={640} height={640}/>
        </div>
        <ul className={l.list}>
          <li className={l.item}>
            <span className={l.icon}><DateIcon /></span>
            <span className={l.content}>
              <time>{humanReadableDate}</time>
            </span>
          </li>
          <li className={l.item}>
            <span className={l.icon}><AddressIcon /></span>
            <span className={l.content}>
              <address>{address}</address>
            </span>
          </li>  
        </ul>
      </section>
      <section className={s.content}>
        <p>{description}</p>
      </section>
    </>
  )
}

