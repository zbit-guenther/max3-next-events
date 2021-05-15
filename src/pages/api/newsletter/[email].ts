import { MongoClient } from 'mongodb'

interface Email { email: String }

export default async function handler(req, res) {
  const email = req.query.email
   
  switch (req.method) {
    case 'GET': {    
      if (!check(email)) {
        res.status(204).json({ message: 'email not registered'})
      } else {
        res.status(200).json({ message: 'OK', newsletter: email })
      }
      break
    }
    case 'POST': {
      await add(email)
      res.status(201).json({ message: 'added', newsletter: email })
      break
    }
    case 'DELETE': {
      if (await del(email)) {
        res.status(204).json({ message: 'deleted', newsletter: email })
      } else {
        res.status(404).json({ message: 'not found', newsletter: email})
      }
      break
    }
    default: {
      res.status(405).json({message: 'API method not supported'})
    }
  } 
}

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