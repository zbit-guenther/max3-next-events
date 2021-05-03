import s from './NewsletterRegistrationStyles.module.css'

export default function NewsletterRegistration() {
  
  const  register = (e) => {
    e.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={s.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={register}>
        <div className={s.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}
