import { useRef } from 'react'
import { ActionButton } from "../Button"
import s from './EventSearch.module.css'

interface Props {
  onSearch: (year: string, month: string) => void
}
export const EventSearch = ({ onSearch }: Props) => {

  const yearRef = useRef<HTMLSelectElement>()
  const monthRef = useRef<HTMLSelectElement>()


  const formSubmit = (e: Event) => {
    e.preventDefault()
    const year = yearRef.current.value 
    const month = monthRef.current.value
    onSearch(year, month)
  }

  return (
    <form className={s.form}>
      <div className={s.controls}>
        <div className={s.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={s.control}>
          <label htmlFor="month">Month</label>
          <select id="montth" ref={monthRef}>
            <option value="01">Januar</option>
            <option value="02">Februar</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <div className="formbutton">
        <ActionButton action={formSubmit}>Find Events</ActionButton>
      </div>
    </form>
  )
}