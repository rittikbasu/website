import { useState, useEffect } from 'react'

export const formatDate = (date) => {
  const [formattedDate, setFormattedDate] = useState(null)

  useEffect(() =>
    setFormattedDate(
      new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      })
    )
  )

  return formattedDate
}
