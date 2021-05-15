import { BreakingChangeType } from 'graphql';
import { FormEvent, useRef, useState } from 'react';
import { ConfirmModal } from '../../lib/components/ConfirmModal';
import s from './NewsletterRegistrationStyles.module.css'

export default function NewsletterRegistration() {
  
  const timeout = 3000
  let hello = "It's a good way to stay updated"  

  const [message, setMessage] = useState<string>(hello)
  const [alert, setAlert] = useState(s.normal)
  const [del, setDel] = useState(false)
  const emailRef = useRef<HTMLInputElement>()

  const delEmail = (e: FormEvent) => {
    e.preventDefault()

  }

  const  register = (e: FormEvent) => {
    e.preventDefault()
    const email = emailRef.current.value

    setTimeout(() => {
      setAlert(s.normal)
      setMessage(hello) 
    }, 3000);

    if(email===''){
      setAlert(s.error)
      setMessage('You must enter an email address first.')
      return
    }

    // check if email already in newsletter
    fetch(`/api/newsletter/${email}`, { method: 'GET' })
    .then(res => {
      switch (res.status) {
        case 200: {
          if (del) {
            fetch(`/api/newsletter/${email}`, { method: 'DELETE'})
            .then(res => {
              switch (res.status) {
                case 204: {
                  setMessage(`${email} removed from newsletter`)
                  setAlert(s.success)
                  break
                }
                case 404: {
                  setMessage(`${email} was not in newsletters`)
                  setAlert(s.error)
                  break
                }
                default: {
                  setMessage(`${email} could not be removed. Try again!`)
                  setAlert(s.error)
                }
              }
            }) 
          } else {
            hello = 'You will receive our weekly newsletter.'
            setMessage('This email address is already registered')
            setAlert(s.success)
          }
          break
        }
        case 201: {
          setMessage('created = this can not happen')
          setAlert(s.error)
          break
        }
        case 204: {
          fetch(`/api/newsletter/${email}`, { method: 'POST'})
          .then(res => {
            console.log(res)
            hello = 'You will receive our weekly newsletter.'
            setMessage('Your are added to our mailing list.')
            setAlert(s.success)
          })
          break
        }
        case 404: {
          
          break
        } 
        default: {
          setMessage('Something went wrong, try again!')
          setAlert(s.error)
          console.log(res)
        }
      }
    })
    emailRef.current.value = ''
  }

  return (
    <section className={s.newsletter}>
      <h2>Sign up to our newsletter!</h2>
      <form onSubmit={register}>
        <div className={s.control}>
          <input
            ref={emailRef}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
          <button onClick={()=> setDel(true)}><div className={s.delete}>x</div></button>
        </div>
      </form>
      <p className={alert}>{message}</p>
    </section>
  );
}
