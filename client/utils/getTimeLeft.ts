export function getTimeLeft(createdAt: string) {
  //work out auction duration, time created, 5 days after created
  const auctionDuration = 5 * 24 * 60 * 60 * 1000
  const created = new Date(createdAt).getTime()
  const expiresAt = created + auctionDuration

  const diff = expiresAt - Date.now() //time remaining
  if (diff <= 0) return '00:00'

  //work out values for 00:00:00:00 format
  const totalSeconds = Math.floor(diff / 1000)

  const days = Math.floor(totalSeconds / (24 * 60 * 60))
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const secondsFormat = seconds.toString().padStart(2, '0')

  return `${days}d ${hours}h ${minutes}m ${secondsFormat}s`
}

//getTime() = changes the db timestamp into a milliseconds value
//padStart() = sets default # of digits at start (2) so shows 07:00 not 7:00
