export interface Comment {
  id: string
  eventId: string
  email: string
  name: string
  date: string
  text: string
}

const apiUrl = 'https://max3-next-events-default-rtdb.firebaseio.com/comments.json'

async function getAllComments(): Promise<Comment[]> {
  const response = await fetch(apiUrl)
  const data = await response.json()
  const comments: Comment[] = [] 
  for (const key in data) comments.push(data[key])

  return comments
}

export const writeComment = async (comment: Comment) => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    ContentType: 'application/json'
  })
}

export const getComments = async (eventId: string) => {
  const comments = await getAllComments()
  return comments.filter((c) => c.id === eventId)
}