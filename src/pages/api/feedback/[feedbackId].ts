import { readFeedback, writeFeedback, Feedback } from '.'

export default function handler(req, res) {

  const feedbackId = req.query.feedbackId
  const data = readFeedback()
  
  switch (req.method) {
    case 'GET': {    
      const feedback = data.find(f => f.id === feedbackId)
      res.status(200).json({ feedback })
      break
    }
    case 'DELETE': {
      const i = data.map((e: Feedback) => e.id).indexOf(feedbackId)
      const feedback = data.splice(i, 1)
      writeFeedback(data)
      res.status(202).json({ message: 'deleted', feedback })
      break
    }
    default: {
      res.status(405).json({message: 'API method not supported'})
    }
  } 
}