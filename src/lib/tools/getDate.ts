/**
 * @param dateFormat string of type DateFormat
 * @param date Date optional 
 * @returns formatted date string
 */

export type DateFormat = 'YYYY-MM-DD' | 'D MMM YYYY' | 'DD/MM/YY' 

export function getDate(dateFormat:DateFormat, date:Date = new Date()) {
  
  const YYYY = date.getFullYear().toString()
  const YY = YYYY.substring(2)
  const M = (date.getMonth() + 1).toString()
  const MM = M.length === 2 ? M : '0' + M 
  const D = date.getDate().toString()
  const DD = D.length === 2 ? D : '0' + D
  
  switch (dateFormat) {
    case 'YYYY-MM-DD': {
      return `${YYYY}-${MM}-${DD}`
    } 
    case 'DD/MM/YY': {
      return `${DD}/${MM}/${YY}`
    }
    case 'D MMM YYYY': {
      return (date.toLocaleDateString('en-GB', 
        {day: 'numeric', month: 'long', year: 'numeric',}
      ))
    }
    default: {
      return 'Error: dateFormat not supported.'
    }
  }
}