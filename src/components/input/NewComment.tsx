import { useRef, useState } from 'react';
import { CommentCore } from './Comments'
import { commentValid } from '../../pages/api/comments/[eventId]'
import s from './NewCommentStyles.module.css';

interface Props {
  addComment: (commentCore: CommentCore) => void
}
export function NewComment({ addComment }: Props) {
  const [isInvalid, setIsInvalid] = useState(false);

  const emailRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const commentRef = useRef<HTMLTextAreaElement>();

  function sendComment(event) {
    event.preventDefault();

    const email = emailRef.current.value 
    const name = nameRef.current.value
    const text = commentRef.current.value

    emailRef.current.value = '' 
    nameRef.current.value = ''
    commentRef.current.value = ''
    
    const id = 'fake'
    const date = 'fake'
    const eventId = 'fake'

    const commentCore = { email, name, text }
    const dummy = {...commentCore, id, eventId, date }

    if (!commentValid(dummy)){
      setIsInvalid(true);
      return;
    }
    
    addComment(commentCore);
  }

  return (
    <form className={s.form} onSubmit={sendComment}>
      <div className={s.row}>
        <div className={s.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' ref={emailRef} />
        </div>
        <div className={s.control}>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name' ref={nameRef} />
        </div>
      </div>
      <div className={s.control}>
        <label htmlFor='comment'>Your comment</label>
        <textarea id='comment' rows={5} ref={commentRef}></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
