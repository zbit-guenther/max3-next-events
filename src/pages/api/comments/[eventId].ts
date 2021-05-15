import { Comment } from './'
import { MongoClient } from 'mongodb'

async function mongoConnect() {
  const mongo_url = process.env['MONGO_URL']
  const client = await MongoClient.connect(
    mongo_url, { useNewUrlParser: true, useUnifiedTopology: true }
  )
  return client
}

async function check(email: string) {
  const mongo = await mongoConnect()
  const db = mongo.db()
  const result = await db.collection<Email>('emails').findOne( { email })
  // result: null || { _id: ..., email: '...' }
  // ======
  mongo.close()
  if (result) {
    return true
  }
  return false
}

async function add(email: string) {
  const mongo = await mongoConnect()
  const db = mongo.db()
  await db.collection<Email>('emails').insertOne( { email })
  mongo.close()
}

async function del(email: string){
  const mongo = await mongoConnect()
  const db = mongo.db()
  const result = await db.collection<Email>('emails').findOneAndDelete( { email })
  // result.value: null || { _id: ..., email: '...' }
  // ============
  mongo.close()
  console.log(result)
  if (result.value === null) {
    return false
  }
  return true
} 

const firebaseUrl = 'https://max3-next-events-default-rtdb.firebaseio.com/comments.json'
const mongo

const getAllComments = async () => {
  const allComments: Comment[] = []
  await fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    for(const key in data) {
      const c = data[key]
      c.date = +c.id     // date in sec. coverted to number
      c.id = key         // id from firebase
      allComments.push(c)
    }  
  })
  console.log('[getAllComments())]', allComments)
  return allComments
}

const getEventComments = async (eventId: string) => {
  const data =await getAllComments()
  const result = data.filter(c => c.eventId === eventId)
  const sorted = data.sort((left, right): number => {
    // descending:
    if (left.date < right.date) return 1
    if (left.date > right.date) return -1
    return 0
  })
  console.log(`[getAllComments(${eventId}))]`, result)
  return sorted
}

export const commentValid = (comment: Comment) => {
  const { email, text, name } = comment
  return (
    email.includes('@') 
    || name || name.trim() !== '' 
    || text || text.trim() !== ''
  )
  // always validate on the server side !!
  // client side just for quicker response,
  // as it is manipulable
}

export default async function handler(req, res) {

  const eventId = req.query.eventId

  switch (req.method) {

    case 'POST': {
      const comment = req.body
      console.log(`[api/comments/${eventId}, POST]`, comment)
      if (!commentValid(comment)) {
        res.status(422).json({message: 'Invalid input.'})
        break
      }
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment)
      })
      res.status(201).json({message: 'Comment added.', comment })
      break
    } 

    case 'GET': {
      const comments = await getEventComments(eventId)
      res.status(200).json({ comments })
      break
    }

    default: { 
      res.status(405).json({message: 'API method not supported'})
    }
  }
}