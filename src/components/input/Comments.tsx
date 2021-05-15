import { useState, useEffect } from 'react';
import { getDate } from '../../lib/tools'
import { Comment } from '../../pages/api'
import { CommentList, NewComment } from '.';
import s from './CommentsStyles.module.css';

export interface CommentCore {
  email: string
  name: string
  text: string
}

interface Props {
  eventId: string
}
export function Comments({ eventId }: Props) {

  const [showForm, setShowForm] = useState(false)
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([])

  function toggleCommentsHandler() {
    setShowForm(prevStatus => !prevStatus)
    setShowComments((prevStatus) => !prevStatus);
  }

  // function getDate('') {
  //   const date = new Date()
  //   const year = date.getFullYear().toString()
  //   const mon = (date.getMonth() + 1).toString()
  //   const day = date.getDate()
  //   let days = day.toString()
  //   if (days.length === 1) days = '0' + days 
    
  //   return `${year}-${mon}-${days}`
  // }

  async function addComment(commentCore: CommentCore) {
    const comment: Comment = {
      ...commentCore,
      id: Date.now().toString(),
      eventId,
      date: getDate('YYYY-MM-DD', new Date())
    }

    await fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(comment) ,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(() => {
      getComments(eventId)
    })
  }

  const getComments = async (eventId: string) => {
    await fetch(`/api/comments/${eventId}`)
    .then(res => res.json())
    .then(data => setComments(data.comments))
  }

  useEffect(() => {
    getComments(eventId)
  }, [])

  return (
    <section className={s.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showForm && <NewComment addComment={addComment} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
