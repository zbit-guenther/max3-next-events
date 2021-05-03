import { getFilteredEvents, Event, filterEvents } from '../../../data'
import { EventList, ResultsTitle, ErrorAlert } from '../../../components'

export async function getServerSideProps(context) {
  
  const { params } = context
  const filter = params.slug
  const sYear = filter[0]
  const sMonth = filter[1]
  const nYear = +sYear
  const nMonth = +sMonth
  if (
    isNaN(nYear) || isNaN(nMonth) || 
    nYear > 2030 || nYear < 2021  ||
    nMonth < 1   || nMonth > 12
  ) {
    console.log('failed: ', nYear, nMonth)
    return { props: { hasError: true } }
  }
  if (nYear) {
    const nFilter = { nYear, nMonth }
    const sFilter = { sYear, sMonth }
    const date = `${sYear}-${sMonth}-01`
    //const  events = await filterEvents(sFilter)
    const events = await getFilteredEvents(nFilter)
    return { props: {
      hasError: false,
      date,
      events
    }}
  } else {
    return { props: { hasError: true } }
    console.log('fall-back: ', nYear, nMonth)
  }
}

interface Props {
  hasError: boolean,
  events?: Event[]
  date?: string
}
export default function FilteredEventsSSR(props: Props) {

  if (props.hasError) {
    return (
      <ErrorAlert>
        Invalid filter, please adjust your values!
      </ErrorAlert>  
    )
  }
  
  let content
  const { date, events } = props

  if (events) {
    content = events.length > 0 ? (
      <EventList events={events} />
    ) : (
      <ErrorAlert>
        No events found in the specified month.
      </ErrorAlert>
    )
  
    return (
      <div>
        <ResultsTitle date={date} />
        {content}
      </div>
    ) 
  } else {
    return <p>Loading ...</p>
  }
}
