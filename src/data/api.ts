export interface Event {
  id: string
  title: string
  description: string
  location: string
  date: string
  image: string
  isFeatured: boolean
}

export async function getAllEvents(): Promise<Event[]> {
  const response = await fetch(
    'https://max3-next-events-default-rtdb.firebaseio.com/events.json'
  )
  const data = await response.json()
  let events: Event[] = [] 
  for (const key in data) events.push(data[key])

  return events
}

export async function getEventById(id) {
  const events = await getAllEvents()

  return events.find((event) => event.id === id);
}

export async function getFeaturedEvents(): Promise<Event[]> {
  const events = await getAllEvents()

  return events.filter(event => event.isFeatured)
}

export async function filterEvents({ sYear, sMonth }): Promise<Event[]> {
  const events = await getAllEvents()
  
  const filtered = events.filter((event) => {
    const d = event.date.split('-')
    return sYear === d[0] && sMonth === d[1]
  })

  return filtered
}

export async function getFilteredEvents({ nYear, nMonth }): Promise<Event[]> {
  const events = await getAllEvents() 

  let filtered = events.filter((e) => {
    const date = new Date(e.date);
    return date.getFullYear() === nYear 
      && date.getMonth() === nMonth - 1
  });

  return filtered;
}