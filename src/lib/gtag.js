export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID

export const pageView = (url, title) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_location: url,
    page_title: title,
  })
}

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
