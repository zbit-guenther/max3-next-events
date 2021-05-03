import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { getFilteredEvents, Event, filterEvents } from '../../data'
import { EventList, ResultsTitle, ErrorAlert } from '../../components'

export default function FilteredEventsPage() {
  const router = useRouter()
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const { data, error } = useSWR(
    'https://max3-next-events-default-rtdb.firebaseio.com/events.json'
  )

  let filter
  let date
  if (router.query.slug) {
    filter = router.query.slug
    date = `${filter[0]}-${filter[1]}-01`
  }

  
  useEffect(() => { 
    const events:Event[] = []
    if (data) {
      for (const key in data) events.push(data[key])
    }
    const filtered = events.filter(event => {
      const d = event.date.split('-')
      return d[0] === filter[0] && d[1] === filter[1]
    })
    setFilteredEvents(filtered)
  }, [data])
   
  if (error) {
    return (
      <ErrorAlert>
        Something went wrong with fetching data!
      </ErrorAlert>
    )
  }
  if (filter && !checkFilter(filter)) {
    return (
      <ErrorAlert>
        Invalid filter, please adjust your values!
      </ErrorAlert>  
    )
  }

  let content
  if (filteredEvents) {
    content = filteredEvents.length > 0 ? (
      <EventList events={filteredEvents} />
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

function checkFilter(filter): boolean {
  let nYear
  let nMonth
  try {
    nYear = +filter[0]
    nMonth = +filter[1]
  } catch {
    return false
  }
  if (
    isNaN(nYear) || isNaN(nMonth) || 
    nYear > 2030 || nYear < 2021  ||
    nMonth < 1   || nMonth > 12
  ) {
    return false
  } 
  return true
}