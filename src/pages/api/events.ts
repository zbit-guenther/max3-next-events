export default function handler(_req, res) {
  const events = getAllEvents()
  console.log(events)
  res.status(200).json(events)
}

const getAllEvents = async () => {
  const events = await fetch(
    'https://max3-next-events-default-rtdb.firebaseio.com/events.json'
  ) 
}