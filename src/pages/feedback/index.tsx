import { useRef, FormEvent, useState, useEffect } from 'react'
import Link from 'next/link'

export default function FeedbackPage() {

  const [fb, setFb] = useState(null) 

  const emailRef = useRef<HTMLInputElement>()
  const feedbackRef = useRef<HTMLTextAreaElement>()

  function submit(e: FormEvent) {
    e.preventDefault()
    const email = emailRef.current.value
    const text = feedbackRef.current.value

    fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, text })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        emailRef.current.value = ''
        feedbackRef.current.value = ''
      })
    ;
  }

  useEffect(() => {
    fetch('/api/feedback')
      .then(res => res.json())
      .then(data => {
        const feedback = data.feedback
        const feedbackList = <>
          <ul>
            {feedback.map(f => <li key={f.id}>{f.email}: {f.text}</li>)}
          </ul>
        </>
        setFb(feedbackList)
      })
  },[fb])

  return(
    <>
      <h1>Feedback</h1>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <br />
          <input type="email" id="email" ref={emailRef} />
        </div>
        <br />
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <br />
          <textarea id="feedback" rows={5} ref={feedbackRef} />
        </div>
        <br />
        <button type="submit">Send Feedback</button>
      </form>
     
      <br />
      <hr />
      <button>
        <Link href='/feedback/all'>
          To delete Feedbacks go to Feedbacks Page
        </Link> 
      </button>
      {fb}
    </>
  )
}