import { useState, useEffect } from 'react'

export const FormatDate = (date) => {
  const [formattedDate, setFormattedDate] = useState(null)

  useEffect(
    () =>
      setFormattedDate(
        new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })
      ),
    [date]
  )

  return formattedDate
}
