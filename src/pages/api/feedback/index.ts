import fs from 'fs'
import path from 'path'

export interface Feedback {
  id: string
  email: string
  text: string
}

function setPath() {
  return path.join(process.cwd(), 'src/data', 'feedback.json')
}

export function readFeedback() {
  const file = setPath()
  const fileData = fs.readFileSync(file, 'utf-8')
  const data = JSON.parse(fileData)
  return data
}

export function writeFeedback(allFeedback: Feedback[]) {
  const file = setPath()
  const feedback = JSON.stringify(allFeedback) 
  fs.writeFileSync(file, feedback)
}

export default function handler(req, res) {
  const data = readFeedback()
  const file = setPath()
  switch (req.method) {
    case 'POST': {
      const email = req.body.email
      const text = req.body.text
      const id = new Date().toISOString()
      const feedback = { id, email, text }
    
      // store it into /data/feedback.json with initial content of []       
      data.push(feedback)
      writeFeedback(data)
      res.status(201).json({message: 'Success', feedback})
      break
    } 
    case 'GET': {
      res.status(200).json({ feedback: data })
      break
    }
    default: { 
      res.status(405).json({message: 'API method not supported'})
    }
  }
}