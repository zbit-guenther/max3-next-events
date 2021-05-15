import  { useEffect, useState } from 'react'
import { getDate } from '../../lib/tools';
import { Comment } from '../../pages/api'
import s from './CommentListStyles.module.css';

interface Props{
  comments: Comment[]
}
export function CommentList({ comments }: Props) {

  // const [comments, setComments] = useState<Comment[]>(comments)

  // useEffect(() => {
  //   fetch(`/api/comments/${eventId}`)
  //   .then(res => res.json())
  //   .then(data => setComments(data.comments))
  // }, [])

  return (
    <ul className={s.comments}>
      {comments.map(comment => 
        <li key={comment.id}>
          <p>{getDate('YYYY-MM-DD', new Date(comment.date))}:</p>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      )}
    </ul>
  );
}
