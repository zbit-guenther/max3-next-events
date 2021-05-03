import { useState } from 'react'
import { readFeedback, Feedback } from '../api/feedback'

export async function getStaticProps() {
  //const data = fetch('/api/feedback') NOT IN getStaticProps
  const data = readFeedback()
  return { props: { feedback: data} }  
}

interface Props {
  feedback: Feedback[]
}
export default function FeedbacksPage({ feedback }: Props) {
  
  const [fb, setFb] = useState<Feedback[]>(feedback)
  const [sf, setSingleFeedback] = useState<Feedback>(null)

  const deleteFeedback = (id: string) => {
    fetch(`/api/feedback/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    // you can't use readFeedback() here
    // becuase this runs in the browser:
    .then(() => fetch('/api/feedback'))
    .then(res => res.json())
    .then(data => setFb(data.feedback[0]))
  }
  
  // this is just to show that /api/feedback/[feedbackId]
  // can handle GET requests.
  // Normally you would use showEmail() below
  const showFeedbackDetails = (id: string) => {
    if (sf && id === sf.id) {
      setSingleFeedback(null)
    } else {
      fetch(`/api/feedback/${id}`)
      .then(res => res.json())
      .then(data => {
        setSingleFeedback(data.feedback)
      })
    }  
  }

  const showEmail = (f: Feedback) => {
    if (sf && f.id === sf.id) {
      setSingleFeedback(null)
    } else {
      setSingleFeedback(f)
    }
  } 

  return (
    <ul>
      {fb.map(f => 
        <li key={f.id}>
          
          <button onClick={() => deleteFeedback(f.id)}>x</button> 
          &nbsp; &nbsp;
          <button onClick={() => showEmail(f)}>?</button>
          &nbsp;
          {f.text} {sf && sf.id === f.id && <strong>&nbsp;{f.email}</strong>}
          
        </li>
      )}
    </ul>
  )
}

