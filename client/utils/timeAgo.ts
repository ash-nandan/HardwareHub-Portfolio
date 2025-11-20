export function timeAgo(dateString: string) {
  //Create time variables for bid created time + current time
  const bidDate = new Date(dateString)
  const now = new Date()

  //Math function to work out how many seconds ago the bid was created
  const seconds = Math.floor((now.getTime() - bidDate.getTime()) / 1000)

  //Blocks of time assigned to a known name, max breakpoints for each
  const units = [
    { max: 60, value: 1, name: 'second' },
    { max: 3600, value: 60, name: 'minute' },
    { max: 86400, value: 3600, name: 'hour' },
    { max: 604800, value: 86400, name: 'day' },
    { max: 2629800, value: 604800, name: 'week' },
    { max: 31557600, value: 2629800, name: 'month' },
    { max: Infinity, value: 31557600, name: 'year' },
  ]

  //In-built javascript date formatter to word time ago in friendly english terms ie. yesterday, last week...
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  //for every time block in our units array
  for (const unit of units) {
    if (seconds < unit.max) {
      //if the seconds are less than the max
      const value = Math.floor(seconds / unit.value) * -1
      //use that block value and times by -1 so the time becomes 'ago'
      return rtf.format(value, unit.name as Intl.RelativeTimeFormatUnit)
      //Return the outcome using JavaScipt's formatter
    }
  }

  //safety if time block is not found for some reason
  return ''
}
