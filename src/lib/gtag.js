export const GA_TRACKING_ID = 'G-WZ955LFQR5'

export const pageview = (url, title) => {
  window.gtag('config', GA_TRACKING_ID, {
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
