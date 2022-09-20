import { useState, useEffect } from 'react'

// export function formatDate(dateString) {
//   return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//     timeZone: 'UTC',
//   })
// }

export const formatDate = (date) => {
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
    []
  )

  return formattedDate
}
